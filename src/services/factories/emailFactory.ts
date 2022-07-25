const generateEmail = (senderEmail: string, recipientEmail: string, body: string) => {
  const bodyFormatted = `
    <h3>Eae, tudo bem?</h3>
    <p>A seguinte prova foi adicionada: <strong>${body}</strong></p>
  `;

  return {
    to: recipientEmail,
    from: senderEmail,
    subject: 'Nova prova adicionada',
    html: bodyFormatted,
  };
};

export default { generateEmail };
