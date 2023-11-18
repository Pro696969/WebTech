document.getElementById('signuppg').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const Name = document.getElementById('Name').value;
    const Phone = document.getElementById('Phone').value;
    const Email = document.getElementById('Email').value;
    const Loginid = document.getElementById('Loginid').value;
    const Password = document.getElementById('Password').value;
    const ConfirmP = document.getElementById('ConfirmP').value;
    if (Password !== ConfirmP) {
      alert('Password and Confirm Password do not match.');
      return;
  }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name,Phone,Email,Loginid,Password,ConfirmP }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert('User registered successfully!');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  