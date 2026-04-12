"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    whatsapp_phone: "",
    callmebot_api_key: "",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setForm({
          whatsapp_phone: data.whatsapp_phone || "",
          callmebot_api_key: data.callmebot_api_key || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    } catch {
      alert("Erreur serveur");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-gold-200 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">⚙️ Paramètres</h1>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        {/* WhatsApp Notification Settings */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📱</span>
            <div>
              <h2 className="font-semibold text-gray-900">Notifications WhatsApp</h2>
              <p className="text-sm text-gray-500">
                Recevez une notification WhatsApp à chaque nouvelle commande
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro WhatsApp de l&apos;admin *
            </label>
            <input
              type="tel"
              value={form.whatsapp_phone}
              onChange={(e) => setForm({ ...form, whatsapp_phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gold outline-none"
              placeholder="+237 6XX XXX XXX"
            />
            <p className="text-xs text-gray-400 mt-1">
              Format international avec indicatif pays (ex: +237612345678)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Clé API CallMeBot
            </label>
            <input
              type="text"
              value={form.callmebot_api_key}
              onChange={(e) => setForm({ ...form, callmebot_api_key: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gold outline-none"
              placeholder="Votre clé API CallMeBot"
            />
            <p className="text-xs text-gray-400 mt-1">
              Obtenez votre clé sur{" "}
              <a
                href="https://www.callmebot.com/blog/free-api-whatsapp-messages/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 hover:underline"
              >
                callmebot.com
              </a>
              {" "}— Envoyez le message indiqué depuis votre WhatsApp pour activer l&apos;API.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-gold-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
          {saved && (
            <span className="text-green-600 font-medium text-sm">
              ✓ Paramètres sauvegardés
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
