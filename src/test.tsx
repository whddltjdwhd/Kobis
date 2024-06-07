export async function fetchData() {
  try {
    const response = await fetch('http://localhost:8000/data');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    alert(`Message: ${data.message}\nDate: ${data.date}`);
  } catch (error: any) {
    console.error('Fetch error:', error);
    alert('An error occurred: ' + error.message);
  }
}
