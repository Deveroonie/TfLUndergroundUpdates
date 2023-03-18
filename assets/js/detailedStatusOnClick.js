//let's be kind and make one request on load
var r;
window.addEventListener("load", (event) => {
    axios.get("https://corsproxy.io/?https%3A%2F%2Ftfl.cxllm.uk%2Funderground").then(function (response) {r = response.data})
})

document.getElementById("bakerloo").addEventListener("click", function() { f("bakerloo") });
document.getElementById("central").addEventListener("click", function() {f("central")});
document.getElementById("circle").addEventListener("click", function(){f("circle")});
document.getElementById("district").addEventListener("click", function(){f("district")});
document.getElementById("dlr").addEventListener("click", function(){f("dlr")});
document.getElementById("elizabeth_line").addEventListener("click", function(){f("elizabethline")});
document.getElementById("hammersmith_and_city").addEventListener("click", function(){f("hammersmithandcity")});
document.getElementById("jubilee").addEventListener("click", function(){f("jubilee")});
document.getElementById("metropolitan").addEventListener("click", function(){f("metropolitan")});
document.getElementById("northern").addEventListener("click", function(){f("northern")});
document.getElementById("piccadilly").addEventListener("click", function(){f("piccadilly")});
document.getElementById("victoria").addEventListener("click", function(){{f("victoria")}});
document.getElementById("waterloo_and_city").addEventListener("click", function(){f("waterlooandcity")});

function f(apil) {
    console.log("aa")
    
        var i = r.current_status[apil]

        var icon;
        var as = "All";
        if(i.status.includes("Good")) {icon = "success"}
        if(i.status == "Minor Delays" || i.status == "Part Closure" || i.status == "Part Suspended") {icon = "warning"}
        if(i.status == "Planned Closure" || i.status == "Severe Delays") {icon = "error"}

        if(i.affected_stations.length) {
            i.affected_stations.forEach(s => {
                if(s.length == "3") {
                    if(as == "All") {
                        as = `Between ${s[0]}, ${s[1]} and ${s[2]}`
                    } else {
                    as = `${as}<br>Between ${s[0]}, ${s[1]} and ${s[2]}`
                    }
                } else {
                if(as == "All") {
                    as = `Between ${s[0]} and ${s[1]}`
                } else {
                as = `${as}<br>Between ${s[0]} and ${s[1]}`
                }
            }
            })
            
        }
        Swal.fire({
            title: `${i.line} - London Underground status`,
            html: `Affected stations: ${as}<br><br>${i.details || "Good Service"}`,
            icon: `${icon}`

        })
        
    }