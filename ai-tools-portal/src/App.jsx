import { useState } from "react";

const TABS = ["AI Tools", "Use Cases", "Ideas"];

export default function App() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <div className="min-h-screen bg-red-600 text-white flex flex-col">
      <header className="py-6 shadow-lg bg-red-700">
        <h1 className="text-3xl font-bold text-center tracking-wide">Go AI with I-Tap</h1>
        <nav className="flex justify-center mt-4 space-x-4">
          {TABS.map((t) => (
            <button
              key={t}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                tab === t ? "bg-white text-red-700" : "bg-red-500 hover:bg-red-400"
              }`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto p-2 sm:p-4 bg-white bg-opacity-10 rounded-lg shadow flex items-center justify-center min-h-[60vh]">
          <Section tab={tab} />
        </div>
      </main>
    </div>
  );
}

function Section({ tab }) {
  if (tab === "AI Tools") return <AIToolsSection />;
  if (tab === "Use Cases") return <UseCasesSection />;
  return (
    <div className="text-center text-xl font-medium">
      {tab} section coming soon!
    </div>
  );
}

function AIToolsSection() {
  const [tools, setTools] = useState([
    {
      name: "POE.com",
      description: "A platform to chat with multiple AI models including ChatGPT, Claude, and more in one place.",
      link: "https://poe.com/",
      image: "https://poe.com/_next/static/media/poe-share.2e8c2b7e.png",
    },
    {
      name: "ChatGPT",
      description: "OpenAI's conversational AI assistant, great for Q&A, brainstorming, and more.",
      link: "https://chat.openai.com/",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    },
    {
      name: "Claude",
      description: "Anthropic's helpful, harmless, and honest conversational AI assistant.",
      link: "https://claude.ai/",
      image: "https://assets-global.website-files.com/6396b2b6c6c7d2b7c7e7e7e7/63f8b2b6c6c7d2b7c7e7e7e7_claude-logo.png",
    },
    {
      name: "DeepSeek",
      description: "DeepSeek is an advanced AI search and research assistant for deep information retrieval.",
      link: "https://www.deepseek.com/",
      image: "https://www.deepseek.com/favicon.ico",
    },
    {
      name: "Grok",
      description: "Grok is an AI chatbot developed by xAI, designed for real-time knowledge and witty conversation, integrated with X (Twitter).",
      link: "https://grok.x.ai/",
      image: "https://pbs.twimg.com/profile_images/1723145839933569024/0Qw7Qk8A_400x400.jpg",
    },
    {
      name: "Gemini",
      description: "Gemini is Google's next-generation AI model for advanced reasoning, coding, and multimodal tasks.",
      link: "https://gemini.google.com/",
      image: "https://www.gstatic.com/lamda/images/gemini-icon-192.png",
    },
    {
      name: "Copilot (Microsoft)",
      description: "Microsoft Copilot is an AI assistant integrated into Microsoft 365 apps for productivity, content creation, and coding.",
      link: "https://copilot.microsoft.com/",
      image: "https://copilot.microsoft.com/favicon.ico",
    },
    {
      name: "Perplexity AI",
      description: "Perplexity AI is an AI-powered search and answer engine that provides cited, up-to-date answers from the web.",
      link: "https://www.perplexity.ai/",
      image: "https://www.perplexity.ai/favicon.ico",
    },
  ]);
  const [form, setForm] = useState({ name: "", description: "", link: "", image: "" });
  const [editingIdx, setEditingIdx] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setForm((f) => ({ ...f, image: ev.target.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description) return;
    if (editingIdx !== null) {
      setTools((prev) => prev.map((t, i) => (i === editingIdx ? form : t)));
      setEditingIdx(null);
    } else {
      setTools((prev) => [...prev, form]);
    }
    setForm({ name: "", description: "", link: "", image: "" });
  };

  const handleEdit = (idx) => {
    setForm(tools[idx]);
    setEditingIdx(idx);
  };

  const handleDelete = (idx) => {
    setTools((prev) => prev.filter((_, i) => i !== idx));
    if (editingIdx === idx) {
      setForm({ name: "", description: "", link: "", image: "" });
      setEditingIdx(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Share an AI Tool</h2>
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-20 p-4 rounded-lg mb-8 flex flex-col gap-4">
        <input
          className="p-2 rounded text-red-700"
          name="name"
          placeholder="Tool Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          className="p-2 rounded text-red-700"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          className="p-2 rounded text-red-700"
          name="link"
          placeholder="Link (optional)"
          value={form.link}
          onChange={handleChange}
        />
        <input
          className="p-2 rounded text-red-700 bg-white"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit" className="bg-white text-red-700 font-bold px-4 py-2 rounded hover:bg-red-100">
          {editingIdx !== null ? "Update Tool" : "Add Tool"}
        </button>
        {form.image && (
          <img src={form.image} alt="Preview" className="h-24 object-contain mt-2 mx-auto rounded" />
        )}
      </form>
      <h3 className="text-xl font-semibold mb-2">Submitted Tools</h3>
      <div className="grid gap-4">
        {tools.length === 0 && <div className="text-center text-gray-200">No tools submitted yet.</div>}
        {tools.map((tool, idx) => (
          <div key={idx} className="bg-white bg-opacity-30 p-4 rounded flex flex-col md:flex-row items-center gap-4">
            {tool.image && <img src={tool.image} alt={tool.name} className="h-20 w-20 object-cover rounded" />}
            <div className="flex-1">
              <div className="font-bold text-lg">{tool.name}</div>
              <div className="text-sm mb-1">{tool.description}</div>
              {tool.link && (
                <a href={tool.link} target="_blank" rel="noopener noreferrer" className="underline text-white hover:text-red-200">
                  Visit Tool
                </a>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(idx)} className="bg-white text-red-700 px-3 py-1 rounded hover:bg-red-100">Edit</button>
              <button onClick={() => handleDelete(idx)} className="bg-red-800 text-white px-3 py-1 rounded hover:bg-red-900">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UseCasesSection() {
  const [cases, setCases] = useState([
    {
      company: "Brand.ai",
      description: "Uses Claude to automate and scale brand management, maintaining consistency and reducing compliance costs for global brands.",
      link: "https://www.anthropic.com/customers/brand-ai",
      image: "https://assets-global.website-files.com/6396b2b6c6c7d2b7c7e7e7e7/63f8b2b6c6c7d2b7c7e7e7e7_claude-logo.png",
    },
    {
      company: "GitLab",
      description: "Adopted Claude to empower teams for content creation, data analysis, and workflow automation, achieving 25–50% productivity gains.",
      link: "https://www.anthropic.com/customers/gitlab-enterprise",
      image: "https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png",
    },
    {
      company: "Koo",
      description: "Uses ChatGPT to help users generate high-quality content for blogs and social media, boosting engagement and content volume.",
      link: "https://research.aimultiple.com/chatgpt-use-cases/",
      image: "https://pbs.twimg.com/profile_images/1372424113772652544/0nQ5Q9gA_400x400.jpg",
    },
    {
      company: "Spotify & Duolingo",
      description: "Leverage ChatGPT for multilingual customer support, providing seamless support in 30–60+ languages and improving global satisfaction.",
      link: "https://research.aimultiple.com/chatgpt-use-cases/",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    },
    {
      company: "DeepSeek",
      description: "Used by marketing and technical teams for technical documentation, analytics, and multilingual content creation.",
      link: "https://improvado.io/blog/claude-vs-chatgpt-vs-gemini-vs-deepseek",
      image: "https://www.deepseek.com/favicon.ico",
    },
    {
      company: "OpenAI",
      description: "Uses ChatGPT to power customer support and internal knowledge management.",
      link: "https://openai.com/",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/OpenAI_Logo.svg",
    },
    {
      company: "Anthropic",
      description: "Leverages Claude for safe, honest, and helpful AI-driven business automation.",
      link: "https://www.anthropic.com/",
      image: "https://assets-global.website-files.com/6396b2b6c6c7d2b7c7e7e7e7/63f8b2b6c6c7d2b7c7e7e7e7_claude-logo.png",
    },
    {
      company: "Quora",
      description: "Integrates POE.com to let users interact with multiple AI models for Q&A.",
      link: "https://www.quora.com/",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Quora_logo_2015.svg",
    },
  ]);
  const [form, setForm] = useState({ company: "", description: "", link: "", image: "" });
  const [editingIdx, setEditingIdx] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setForm((f) => ({ ...f, image: ev.target.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.company || !form.description) return;
    if (editingIdx !== null) {
      setCases((prev) => prev.map((c, i) => (i === editingIdx ? form : c)));
      setEditingIdx(null);
    } else {
      setCases((prev) => [...prev, form]);
    }
    setForm({ company: "", description: "", link: "", image: "" });
  };

  const handleEdit = (idx) => {
    setForm(cases[idx]);
    setEditingIdx(idx);
  };

  const handleDelete = (idx) => {
    setCases((prev) => prev.filter((_, i) => i !== idx));
    if (editingIdx === idx) {
      setForm({ company: "", description: "", link: "", image: "" });
      setEditingIdx(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Share a Company Use Case</h2>
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-20 p-4 rounded-lg mb-8 flex flex-col gap-4">
        <input
          className="p-2 rounded text-red-700"
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          required
        />
        <textarea
          className="p-2 rounded text-red-700"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          className="p-2 rounded text-red-700"
          name="link"
          placeholder="Link (optional)"
          value={form.link}
          onChange={handleChange}
        />
        <input
          className="p-2 rounded text-red-700 bg-white"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit" className="bg-white text-red-700 font-bold px-4 py-2 rounded hover:bg-red-100">
          {editingIdx !== null ? "Update Use Case" : "Add Use Case"}
        </button>
        {form.image && (
          <img src={form.image} alt="Preview" className="h-24 object-contain mt-2 mx-auto rounded" />
        )}
      </form>
      <h3 className="text-xl font-semibold mb-2">Submitted Use Cases</h3>
      <div className="grid gap-4">
        {cases.length === 0 && <div className="text-center text-gray-200">No use cases submitted yet.</div>}
        {cases.map((uc, idx) => (
          <div key={idx} className="bg-white bg-opacity-30 p-4 rounded flex flex-col md:flex-row items-center gap-4">
            {uc.image && <img src={uc.image} alt={uc.company} className="h-20 w-20 object-cover rounded" />}
            <div className="flex-1">
              <div className="font-bold text-lg">{uc.company}</div>
              <div className="text-sm mb-1">{uc.description}</div>
              {uc.link && (
                <a href={uc.link} target="_blank" rel="noopener noreferrer" className="underline text-white hover:text-red-200">
                  Visit Company
                </a>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(idx)} className="bg-white text-red-700 px-3 py-1 rounded hover:bg-red-100">Edit</button>
              <button onClick={() => handleDelete(idx)} className="bg-red-800 text-white px-3 py-1 rounded hover:bg-red-900">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 