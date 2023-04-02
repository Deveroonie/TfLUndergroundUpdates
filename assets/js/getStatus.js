window.addEventListener("load", (event) => {
  setInterval(() => {
    a()
  }, 2*60*1000);
  function a() {
    try {
    axios.get("https://tfl.cxllm.uk/underground").then(function (response) {
      const r = response.data.current_status
      const dataArray = Object.values(r);
      dataArray.forEach(l => {
        const itu = l.line.toLowerCase().replace(/ /g, "_")
        if(itu == "overground" || itu == "trams") return;
        var status;
        if(l.status.includes("Good")) {status = "green"}
        if(l.status == "Minor Delays") {status = "yellow"}
        if(l.status == "Part Closure" || l.status == "Part Suspended" || l.status == "Severe Delays") { status = "orange"}
        if(l.status == "Planned Closure" || l.status == "Suspended") {status = "red"}
        document.getElementById(`c_${itu}`).src = `./assets/img/SC_${status}.webp`
      })
  })
} catch(err) {
  Swal.fire({
    title: "An error occoured. Please reload.",
    icon: "error"
  })
}
  }

  a()
    
});
