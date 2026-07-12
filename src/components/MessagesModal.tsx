import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Trash2, Search, Filter, MessageSquare, Reply, Calendar } from "lucide-react";
import { MessageRecord } from "../types";

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: MessageRecord[];
  onDeleteMessage: (index: number) => void;
  onClearMessages: () => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({
  isOpen,
  onClose,
  messages,
  onDeleteMessage,
  onClearMessages,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  if (!isOpen) return null;

  // Filter messages based on search query
  const filteredMessages = messages.filter((msg) => {
    const term = searchQuery.toLowerCase();
    return (
      msg.name.toLowerCase().includes(term) ||
      msg.email.toLowerCase().includes(term) ||
      msg.subject.toLowerCase().includes(term) ||
      msg.message.toLowerCase().includes(term)
    );
  });

  // Sort messages
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return sortBy === "newest" ? timeB - timeA : timeA - timeB;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-slate-900 border border-slate-800/80 rounded-2xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-100 tracking-tight uppercase">
                  Visitor Messages
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
                  Inbox for submissions from your contact form
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {messages.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete all messages?")) {
                      onClearMessages();
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-[10px] sm:text-xs font-bold uppercase transition-all cursor-pointer active:scale-95"
                >
                  Clear All
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50 cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Search, Sort and Stats Controls */}
          {messages.length > 0 && (
            <div className="px-6 py-3 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Search input */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 pl-9 pr-4 text-xs font-medium text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Sort selector & stats */}
              <div className="flex items-center gap-4 justify-between w-full sm:w-auto">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Filter className="w-3.5 h-3.5" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-slate-900 border border-slate-800 rounded-md py-1 px-2 text-xs font-bold text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>

                <div className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-950 px-2 py-1 rounded-md border border-slate-900">
                  Showing {sortedMessages.length} of {messages.length}
                </div>
              </div>
            </div>
          )}

          {/* Messages List Area */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center border border-slate-850 relative">
                  <Mail className="w-8 h-8 text-slate-600 animate-pulse" />
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <h4 className="text-sm font-extrabold text-slate-200 uppercase tracking-wide">
                    Inbox is empty
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    When visitors submit a message using the contact form, their queries and feedback will appear here in real-time.
                  </p>
                </div>
              </div>
            ) : sortedMessages.length === 0 ? (
              <div className="text-center py-16 text-slate-500 space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-700" />
                <p className="text-xs font-bold">No matching results found</p>
                <p className="text-[10px] text-slate-500">
                  Try adjusting your search terms or keywords.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedMessages.map((msg, idx) => {
                  // Find original index in unfiltered messages for correct deletion
                  const originalIndex = messages.indexOf(msg);
                  return (
                    <motion.div
                      key={`${msg.email}-${msg.date}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-xl bg-slate-950/60 border border-slate-850/80 hover:border-slate-800 transition-all space-y-4 relative group"
                    >
                      {/* Delete action */}
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this message?")) {
                            onDeleteMessage(originalIndex);
                          }
                        }}
                        className="absolute top-5 right-5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-all cursor-pointer"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
                        <div className="text-left space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-extrabold text-slate-200 uppercase tracking-wide">
                            {msg.name}
                          </h4>
                          <span className="text-[10px] sm:text-xs text-emerald-400 font-semibold block">
                            {msg.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono bg-slate-900/60 border border-slate-850 px-2 py-0.5 rounded-md w-fit sm:self-start">
                          <Calendar className="w-3.5 h-3.5 text-slate-600" />
                          <span>{msg.date}</span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="space-y-2 text-left">
                        <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <span>Subject:</span>
                          <span className="text-slate-200 font-extrabold normal-case text-xs">
                            {msg.subject || "(No Subject)"}
                          </span>
                        </p>
                        <div className="bg-slate-900/80 border border-slate-950 text-xs text-slate-300 p-4 rounded-xl leading-relaxed whitespace-pre-wrap select-text font-sans">
                          {msg.message}
                        </div>
                      </div>

                      {/* Reply button */}
                      <div className="flex justify-start pt-1">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                            msg.subject || "Your message"
                          )}&body=Hi ${encodeURIComponent(msg.name)},%0D%0D`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-[10px] sm:text-xs font-bold uppercase transition-all shadow-md shadow-emerald-500/5 cursor-pointer active:scale-95"
                        >
                          <Reply className="w-3.5 h-3.5" />
                          <span>Reply via Email</span>
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
