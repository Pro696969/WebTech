
  document.getElementById('loginpg').addEventListener('submit', async function (event) {
    event.preventDefault();

    const Loginid = document.getElementById('Loginid').value;
    const Password = document.getElementById('Password').value;

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Loginid, Password }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Login Id doesn\'t exist. Please try again.');
      } else {
        alert('Success.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });
