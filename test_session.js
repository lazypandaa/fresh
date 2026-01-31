// Test session endpoint
fetch('https://freshmart-backend.ambitiousground-569ca432.centralindia.azurecontainerapps.io/api/track/session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_id: 'test@example.com',
    session_id: 'test_session_123',
    action: 'test',
    data: { test: true }
  })
})
.then(response => {
  console.log('Status:', response.status)
  return response.text()
})
.then(text => {
  console.log('Response:', text)
})
.catch(error => {
  console.error('Error:', error)
})