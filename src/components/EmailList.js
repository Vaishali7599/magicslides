const EmailList = ({ emails }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Fetched Emails</h2>
      <ul className="space-y-2">
        {emails.map((email, idx) => {
          const subject = email.payload?.headers?.find(h => h.name === 'Subject')?.value || "(No Subject)";
          const snippet = email.snippet;
          return (
            <li key={email.id} className="border p-2 rounded shadow-sm">
              <strong>{idx + 1}. {subject}</strong>
              <p className="text-sm text-gray-600">{snippet}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default EmailList;
