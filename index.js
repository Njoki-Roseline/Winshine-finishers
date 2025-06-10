import React from 'react';
import ReactDOM from 'react-dom';

const products = [
  { name: "Paints", description: "High-quality paints for all surfaces.", image: "crown-paints.jpg" },
  { name: "Brushes", description: "Durable and high-performance brushes.", image: "green-tip-brush-4.webp" },
  { name: "Varnishes", description: "Protective and finishing varnishes.", image: "varnish.jpg" },
  { name: "Cement", description: "Strong and reliable cement products.", image: "cement.jpg" }
];

const WinshineFinishers = () => {
z  return (
    <div className="p-6 fade-in">
      <h1 className="text-3xl font-bold mb-6">Winshine Finishers Interiors</h1>
      <p className="text-lg mb-6">Your trusted partner for all finishing materials and hardware supplies.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="fade-in">
            <div className="rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-t-2xl" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <button className="mt-4 w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors duration-300">Learn More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<WinshineFinishers />, document.getElementById('root'));