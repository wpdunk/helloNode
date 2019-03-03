var update = document.getElementById("cipofy");

update.addEventListener("click", function() {
  fetch("quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Mario Cipollini",
      quote: "If you break you don't win!"
    })
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload();
    });
});

var del = document.getElementById("delete");

del.addEventListener("click", function() {
  fetch("quotes", {
    method: "delete",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "Lance"
    })
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload();
    });
});
