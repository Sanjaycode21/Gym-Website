"use client";

import { useEffect, useState } from "react";
import { UserCog, Trash2, Search, CheckCircle, Shield, User } from "lucide-react";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/admin/members");
      const data = await res.json();
      if (data.members) {
        setMembers(data.members);
      }
    } catch (err) {
      console.error("Failed to load members", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleToggleRole = async (userId: string, currentRole: string) => {
    const nextRole = currentRole === "ADMIN" ? "MEMBER" : "ADMIN";
    try {
      const res = await fetch("/api/admin/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: nextRole }),
      });

      if (res.ok) {
        setMembers(
          members.map((m) => (m.id === userId ? { ...m, role: nextRole } : m))
        );
        triggerFeedback(`Successfully updated member role to ${nextRole}`);
      }
    } catch (err) {
      console.error("Failed to toggle role", err);
    }
  };

  const handleDeleteUser = async (userId: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete user account "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/members?id=${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMembers(members.filter((m) => m.id !== userId));
        triggerFeedback(`Successfully deleted user account "${name}"`);
      }
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  };

  // Filter members based on search
  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-primary">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="font-dm-sans text-xs tracking-widest uppercase">Retrieving Members Directory...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert Feedback */}
      {feedback && (
        <div className="fixed bottom-8 right-8 bg-[#221f19] border border-primary text-primary px-6 py-4 rounded-sm shadow-[0_0_30px_rgba(201,168,76,0.2)] z-50 flex items-center gap-3 animate-fade-up font-dm-sans text-sm">
          <CheckCircle size={18} className="shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <h3 className="font-bebas text-2xl md:text-3xl tracking-wider uppercase">
          MEMBERS LEDGER
        </h3>
        <div className="relative flex items-center w-full md:w-80">
          <Search className="absolute left-4 w-4 h-4 text-on-surface-variant/50" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#100e08] border border-outline-variant/30 focus:border-primary text-on-surface text-xs pl-12 pr-4 py-3 outline-none rounded-sm transition-all font-dm-sans"
          />
        </div>
      </div>

      {/* Members Grid Ledger */}
      <div className="bg-surface-container border border-outline-variant/30 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest/30 border-b border-outline-variant/20">
                <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Member Profile
                </th>
                <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Security Access
                </th>
                <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Plan Details
                </th>
                <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Registration
                </th>
                <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">
                  System Commands
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredMembers.map((m) => {
                const planName = m.membership?.plan?.name || "NONE";
                const isMemberActive = m.membership?.status === "ACTIVE";

                return (
                  <tr
                    key={m.id}
                    className="hover:bg-[#1e1b15]/50 transition-colors font-dm-sans text-sm"
                  >
                    {/* Profile */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-on-surface uppercase leading-none">{m.name}</h4>
                          <span className="text-xs text-on-surface-variant">{m.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Security Access / Role */}
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center gap-1 text-[9px] font-bold px-3 py-1 tracking-wider uppercase rounded-full ${
                          m.role === "ADMIN"
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-[#2A2A2A] text-on-surface-variant"
                        }`}
                      >
                        {m.role === "ADMIN" ? <Shield size={10} /> : <User size={10} />}
                        {m.role}
                      </span>
                    </td>

                    {/* Plan details */}
                    <td className="p-5">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-xs uppercase text-on-surface">{planName}</span>
                        {m.membership && (
                          <span
                            className={`text-[9px] font-bold w-fit uppercase ${
                              isMemberActive ? "text-primary" : "text-error"
                            }`}
                          >
                            {m.membership.status}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Registration Date */}
                    <td className="p-5 text-on-surface-variant text-xs font-mono">
                      {new Date(m.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    {/* Commands */}
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleToggleRole(m.id, m.role)}
                          className="p-2 border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary rounded-sm transition-all duration-300 cursor-pointer"
                          title="Toggle Admin Privilege"
                        >
                          <UserCog size={14} />
                        </button>
                        {m.role !== "ADMIN" && (
                          <button
                            onClick={() => handleDeleteUser(m.id, m.name)}
                            className="p-2 border border-outline-variant hover:border-error text-on-surface-variant hover:text-error rounded-sm transition-all duration-300 cursor-pointer"
                            title="Delete User Account"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
