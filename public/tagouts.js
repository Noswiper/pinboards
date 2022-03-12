const data = fetch('./system1valves').then(response => response.json()).catch(error => console.log(error));
export default data;