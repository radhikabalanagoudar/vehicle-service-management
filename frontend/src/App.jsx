import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "https://vehicle-service-management-xfzz.onrender.com";

function App() {
  const [page, setPage] = useState("home");
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);

  const getCustomers = async () => {
    try {
      const response = await axios.get(`${API}/api/customers`);
      setCustomers(response.data.customers || []);
      setPage("customers");
    } catch (error) {
    console.error("CUSTOMER API ERROR:", error);
    alert("Could not load customers. Check Console.");
}
  };

  const getVehicles = async () => {
    try {
      const response = await axios.get(`${API}/api/vehicles`);
      setVehicles(response.data.vehicles || []);
      setPage("vehicles");
    } catch (error) {
      alert("Could not load vehicles");
    }
  };

  const getServiceRequests = async () => {
    try {
      const response = await axios.get(
        `${API}/api/service-requests`
      );

      setServiceRequests(
        response.data.serviceRequests || []
      );

      setPage("services");
    } catch (error) {
      alert("Could not load service requests");
    }
  };
  const loadDashboard = async () => {
    try {
      const [customerResponse, vehicleResponse, serviceResponse] =
        await Promise.all([
          axios.get(`${API}/api/customers`),
          axios.get(`${API}/api/vehicles`),
          axios.get(`${API}/api/service-requests`)
        ]);

      setCustomers(customerResponse.data.customers || []);
      setVehicles(vehicleResponse.data.vehicles || []);
      setServiceRequests(serviceResponse.data.serviceRequests || []);

    } catch (error) {
      console.error("DASHBOARD API ERROR:", error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🚗 VSM</h2>

        <p className="subtitle">Vehicle Service</p>

        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          🏠 Dashboard
        </button>

        <button onClick={getCustomers}>
          👤 Customers
        </button>

        <button onClick={getVehicles}>
          🚘 Vehicles
        </button>

        <button onClick={getServiceRequests}>
          🔧 Service Requests
        </button>
      </aside>

      {/* Main Content */}
      <main className="main">

        {/* Header */}
        <header className="header">
          <div>
            <h1>Vehicle Service Management</h1>
            <p>Manage your service center efficiently</p>
          </div>

          <div className="user">
            👨‍💼 Admin
          </div>
        </header>

        {/* Dashboard */}
        {page === "home" && (
          <section>
            <div className="welcome">
              <h2>Welcome back! 👋</h2>
              <p>
                Here's an overview of your vehicle service system.
              </p>
            </div>

            <div className="cards">

              <div className="card">
                <div className="icon">👤</div>
                <h3>Customers</h3>
                <strong>{customers.length}</strong>
                <p>Registered customers</p>
              </div>

              <div className="card">
                <div className="icon">🚘</div>
                <h3>Vehicles</h3>
                <strong>{vehicles.length}</strong>
                <p>Registered vehicles</p>
              </div>

              <div className="card">
                <div className="icon">🔧</div>
                <h3>Service Requests</h3>
                <strong>{serviceRequests.length}</strong>
                <p>Total requests</p>
              </div>

            </div>

            <div className="quick">
              <h2>Quick Actions</h2>

              <button onClick={getCustomers}>
                View Customers
              </button>

              <button onClick={getVehicles}>
                View Vehicles
              </button>

              <button onClick={getServiceRequests}>
                View Service Requests
              </button>
            </div>
          </section>
        )}

        {/* Customers */}
        {page === "customers" && (
          <section>
            <h2>Customers</h2>

            {customers.length === 0 ? (
              <div className="empty">
                No customers found.
              </div>
            ) : (
              <div className="list">
                {customers.map((customer) => (
                  <div className="item" key={customer._id}>
                    <h3>{customer.name}</h3>
                    <p>📧 {customer.email}</p>
                    <p>📱 {customer.phone}</p>
                    <p>📍 {customer.address}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Vehicles */}
        {page === "vehicles" && (
          <section>
            <h2>Vehicles</h2>

            {vehicles.length === 0 ? (
              <div className="empty">
                No vehicles found.
              </div>
            ) : (
              <div className="list">
                {vehicles.map((vehicle) => (
                  <div className="item" key={vehicle._id}>
                    <h3>🚘 {vehicle.vehicleNumber}</h3>
                    <p>
                      Type: {vehicle.vehicleType}
                    </p>
                    <p>
                      Model: {vehicle.model}
                    </p>
                    <p>
                      Customer ID: {vehicle.customerId}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Service Requests */}
        {page === "services" && (
          <section>
            <h2>Service Requests</h2>

            {serviceRequests.length === 0 ? (
              <div className="empty">
                No service requests found.
              </div>
            ) : (
              <div className="list">
                {serviceRequests.map((request) => (
                  <div className="item" key={request._id}>
                    <h3>
                      🔧 {request.serviceType || "Vehicle Service"}
                    </h3>

                    <p>
                      Status:
                      <span className="status">
                        {request.status || "Pending"}
                      </span>
                    </p>

                    <p>
                      Description:{" "}
                      {request.description || "No description"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

      </main>
    </div>
  );
}

export default App;
