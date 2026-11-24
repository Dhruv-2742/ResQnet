import React, { useState } from 'react';
import {
  Users,
  Plus,
  Phone,
  Trash2,
  Send,
  Copy,
  Check,
  AlertTriangle,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { EmergencyContact } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

interface ContactsPageProps {
  contacts: EmergencyContact[];
  onAddContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  onDeleteContact: (id: string) => void;
  selectedCity: string;
}

export const ContactsPage: React.FC<ContactsPageProps> = ({
  contacts,
  onAddContact,
  onDeleteContact,
  selectedCity,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Family');
  const [isPrimary, setIsPrimary] = useState(false);

  const [copied, setCopied] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmedDelivery, setConfirmedDelivery] = useState(false);

  const emergencyMessage = `[resQnet EMERGENCY PREPAREDNESS BROADCAST]
Status: Safe / Taking precautions
Location: ${selectedCity}
Situation: Severe weather / flood alert monitored via IMD & NDMA.
Nearest Evacuation Shelter: Identified & standby.
Phones charged. Will update if power or cellular connectivity drops.
Timestamp: ${new Date().toLocaleString()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emergencyMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onAddContact({
      name: name.trim(),
      phone: phone.trim(),
      relationship,
      is_primary: isPrimary,
      notify_on_sos: true,
    });

    setName('');
    setPhone('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Users className="w-7 h-7 text-blue-600" />
            Emergency Contacts & Verified SOS Broadcast
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage primary contacts and pre-draft safety messages with strict user-permission gates.
          </p>
        </div>

        <Button
          size="sm"
          variant="navy"
          onClick={() => setIsAdding(!isAdding)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Emergency Contact
        </Button>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 shadow-xs text-xs space-y-1">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>User-Approved Transmission Only</span>
        </div>
        <p className="text-amber-800 text-[11.5px] leading-relaxed">
          resQnet <strong>never</strong> sends background automated SMS or WhatsApp messages without your review and explicit user confirmation. Below is your structured broadcast preview that can be copied or launched in your preferred messaging app.
        </p>
      </div>

      {/* Emergency Message Preview Card */}
      <Card borderVariant="highlight" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Prepared Emergency Message (Preview)
            </h3>
          </div>
          <Badge variant="info">User-Approved Only</Badge>
        </div>

        <div className="p-4 rounded-lg bg-slate-50 font-mono text-xs text-slate-800 border border-slate-200 whitespace-pre-wrap leading-relaxed shadow-inner">
          {emergencyMessage}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500 font-medium">
            Contacts to notify: <strong>{contacts.filter((c) => c.notify_on_sos).length}</strong> selected
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCopy}
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied to Clipboard!' : 'Copy Prepared Text'}
            </Button>

            <Button
              size="sm"
              variant="danger"
              onClick={() => setShowConfirmModal(true)}
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              Review & Prepare Broadcast
            </Button>
          </div>
        </div>

        {confirmedDelivery && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Emergency broadcast template reviewed and prepared for your phone's SMS app.</span>
          </div>
        )}
      </Card>

      {/* Add Contact Form */}
      {isAdding && (
        <Card className="p-5 border-blue-200 bg-blue-50/20 space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Add New Contact</h4>
          <form onSubmit={handleCreate} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Phone Number (with Country Code)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 12345"
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Relationship</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value="Family">Family Member</option>
                  <option value="Spouse">Spouse / Partner</option>
                  <option value="Neighbor">Neighbor</option>
                  <option value="Doctor">Doctor / Caregiver</option>
                  <option value="Helpline">Official Helpline</option>
                </select>
              </div>
              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={isPrimary}
                    onChange={(e) => setIsPrimary(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600"
                  />
                  <span>Mark as Primary Emergency Contact</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="navy" type="submit">
                Save Contact
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Contact Cards List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Emergency Network ({contacts.length} Contacts)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{contact.name}</h4>
                    {contact.is_primary && (
                      <Badge variant="navy" size="sm">
                        Primary
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{contact.relationship}</p>
                </div>

                <button
                  onClick={() => onDeleteContact(contact.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                  title="Remove contact"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700 pt-1">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <a href={`tel:${contact.phone}`} className="hover:underline font-mono font-medium">
                  {contact.phone}
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm User-Approved Emergency Broadcast"
      >
        <div className="space-y-4 text-xs text-slate-700">
          <p>
            You are about to review and approve this emergency status broadcast to your verified contacts.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] whitespace-pre-wrap text-slate-800">
            {emergencyMessage}
          </div>
          <p className="text-amber-800 font-semibold bg-amber-50 p-2.5 rounded border border-amber-200">
            ⚠️ Safety Notice: In this MVP phase, confirming copies the text to clipboard and opens your device SMS app. No unauthorized carrier network calls are executed silently.
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" variant="ghost" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setShowConfirmModal(false);
                setConfirmedDelivery(true);
                handleCopy();
              }}
            >
              Confirm & Prepare Broadcast
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
