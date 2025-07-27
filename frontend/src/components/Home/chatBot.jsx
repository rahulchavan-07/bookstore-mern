import React, { useState } from 'react';

const qaData = [
  { question: "What types of books do you sell?", answer: "We offer a wide range including fiction, non-fiction, educational, self-help, and children's books." },
  { question: "How do I place an order?", answer: "Add your favorite books to the cart and follow the checkout process." },
  { question: "Do you deliver books to all cities?", answer: "Yes, we deliver to most major cities. Availability is shown during checkout." },
  { question: "Are there any discounts available?", answer: "Yes, check our homepage for ongoing deals and offers." },
  { question: "Can I cancel an order after placing it?", answer: "Yes, you can cancel it from your Orders page before it is shipped." },
  { question: "How do I track my order?", answer: "You’ll get a tracking link via email and in your profile once it ships." },
  { question: "What if I receive a damaged book?", answer: "Contact support immediately, and we’ll arrange a replacement or refund." },
  { question: "Can I buy used or second-hand books?", answer: "Currently we sell new books only, but pre-owned books are coming soon!" },
  { question: "How do I save favorite books?", answer: "Click the heart icon on any book to add it to your Favorites." },
  { question: "How can I contact your support team?", answer: "Email us at support@yourbookstore.com or visit our Contact Us page. We’re available Mon–Sat, 10 AM to 6 PM." },
];

const sampleQuestions = [
  "What types of books do you sell?",
  "How do I track my order?",
  "How can I contact support?",
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userQuestion.trim()) return;

    const userInput = userQuestion.toLowerCase();
    let matchedAnswer = "Sorry, I couldn't find an answer to that. Please contact support -02342-402228";

    for (let item of qaData) {
      if (userInput.includes(item.question.toLowerCase().split(" ")[0])) {
        matchedAnswer = item.answer;
        break;
      }
    }

    setChatHistory([
      ...chatHistory,
      { type: "user", text: userQuestion },
      { type: "bot", text: matchedAnswer },
    ]);
    setUserQuestion("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
      >
        💬
      </button>

      {open && (
        <div className="w-80 mt-2 bg-white rounded-xl shadow-xl p-4 border border-gray-200 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">📚 BookBot</h2>

          {/* Sample questions */}
          <div className="bg-gray-100 p-2 rounded mb-3">
            <p className="text-sm font-medium text-gray-600 mb-1">Try asking:</p>
            <ul className="list-disc list-inside text-sm text-gray-500">
              {sampleQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>

          {/* Chat history */}
          <div className="flex-1 max-h-64 overflow-y-auto space-y-2 mb-4">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded ${
                  msg.type === "user"
                    ? "bg-blue-100 text-right text-blue-800"
                    : "bg-gray-100 text-left text-gray-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              className="text-black flex-1 p-2 border border-gray-300 rounded outline-none text-sm"
              placeholder="Ask something..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
