const EmailClassifier = ({ classification }) => {
  let parsed = {};
  try {
    parsed = JSON.parse(classification.replace(/```[a-z]*|```/g, ''));
  } catch (e) {
    return <pre className="mt-4 text-red-600">Invalid classification format</pre>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Classification Results</h2>
      <ul className="space-y-1">
        {Object.entries(parsed).map(([index, category]) => (
          <li key={index} className="p-2 border rounded bg-gray-50">
            <span className="font-medium">Email {index}:</span> {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailClassifier;
