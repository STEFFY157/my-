function addToBill(itemName, price) {
    let bill = JSON.parse(localStorage.getItem("bill")) || [];
    const existing = bill.find(item => item.name === itemName);
  
    if (existing) {
      existing.qty += 1;
    } else {
      bill.push({ name: itemName, qty: 1, price });
    }
  
    localStorage.setItem("bill", JSON.stringify(bill));
    alert(`${itemName} added to bill!`);
  }
  
  function loadBill() {
    const bill = JSON.parse(localStorage.getItem("bill")) || [];
    const tableBody = document.getElementById("bill-items");
    const totalAmount = document.getElementById("total-amount");
    let total = 0;
  
    tableBody.innerHTML = "";
  
    bill.forEach(item => {
      const subtotal = item.qty * item.price;
      total += subtotal;
  
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${subtotal.toFixed(2)}</td>
      `;
      tableBody.appendChild(row);
    });
  
    totalAmount.textContent = total.toFixed(2);
  }
  
  function clearBill() {
    localStorage.removeItem("bill");
    loadBill();
  }
  
  // Auto-load bill if on bill page
  if (document.getElementById("bill-items")) {
    loadBill();
  }
  