if (!document.getElementById('crx_plaintext_warning')) {
    let toolbarHeight = 35;
    let div = document.createElement("div");
    let beware = document.createElement("span");
    let click = document.createElement("span");
    div.id = "crx_plaintext_warning";
    let link = document.createElement("a");
    link.href = plaintext;
    link.target = "_blank"
    link.textContent = "This website stores passwords insecurely";
    beware.textContent = "Beware ! ";
    click.textContent = " Click to dismiss this warning.";
    div.appendChild(beware);
    div.appendChild(link);
    div.appendChild(click);
    let st = div.style;
    st.display = "block";
    st.top = "0px";
    st.left = "0px";
    st.width = "100%";
    st.height = toolbarHeight + "px";
    st.background = "#ff5c33";
    st.color = "black";
    st.fontStyle = "italic";
    st.position = "fixed";
    st.fontSize = "18pt"
    link.fontSize = "18pt"
    st.zIndex = "999999999999999"
    div.onclick = function(element) {
        div.style.display = "none";
    };
    let documentBody = document.getElementsByTagName('body')[0]
    documentBody.appendChild(div);
} else {
    document.getElementById('crx_plaintext_warning').style.display = "block"
}
