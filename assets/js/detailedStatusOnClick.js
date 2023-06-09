var r;
window.addEventListener("load", (event) => {
    function b() {
        axios.get("https://tfl.cxllm.uk/underground").then(function (response) {r = response.data})
    }
    setInterval(() => {
        b()
      }, 2*60*1000);
      b()
})

document.getElementById("bakerloo").addEventListener("click", function() { f("bakerloo") });
document.getElementById("central").addEventListener("click", function() {f("central")});
document.getElementById("circle").addEventListener("click", function(){f("circle")});
document.getElementById("district").addEventListener("click", function(){f("district")});
document.getElementById("elizabeth_line").addEventListener("click", function(){f("elizabethline")});
document.getElementById("hammersmith_and_city").addEventListener("click", function(){f("hammersmithandcity")});
document.getElementById("jubilee").addEventListener("click", function(){f("jubilee")});
document.getElementById("metropolitan").addEventListener("click", function(){f("metropolitan")});
document.getElementById("northern").addEventListener("click", function(){f("northern")});
document.getElementById("piccadilly").addEventListener("click", function(){f("piccadilly")});
document.getElementById("victoria").addEventListener("click", function(){{f("victoria")}});
document.getElementById("waterloo_and_city").addEventListener("click", function(){f("waterlooandcity")});
document.getElementById("cmtlm").addEventListener("click", function(){lm()})

function f(apil) {
    console.log("aa")
    
        var i = r.current_status[apil]

        var icon;
        var as = "All";
        if(i.status.includes("Good")) {icon = "success"}
        if(i.status == "Minor Delays") {icon = "warning"}
        if(i.status == "Part Closure" || i.status == "Part Suspended" || i.status == "Part Closure" || i.status == "Part Suspended" || i.status == "Severe Delays") { icon = "warning"}
        if(i.status == "Planned Closure" || i.status == "Suspended") {icon = "error"}

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

    function lm() {
        Swal.fire({
            title: "Circle meanings",
            html: `<div style="text-align:center;"><span style="color:green">Green</span><br>Good service - no delays!<br><span style="color: yellow;">Yellow</span><br>Minor delays.<br><span style="color:orange;">Orange</span><br>Part closure/part suspended, severe delays.<br><span style="color:red;">Red</span><br>Line fully closed.</div>`,
            icon: "info"
        })
    }
