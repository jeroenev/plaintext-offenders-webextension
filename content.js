var toolbarHeight = 50;

var div = document.createElement("div");
div.id = "myToolbar";
div.textContent = "I am the toolbar !";

var st = div.style;
st.display = "block";
st.top = "0px";
st.left = "0px";
st.width = "100%";
st.height = toolbarHeight + "px";
st.background = "#C2E2FF";
st.color = "grey";
st.fontStyle = "italic";
st.position = "fixed";

document.body.style.webkitTransform = "translateY(" + toolbarHeight + "px)";
document.documentElement.appendChild(div);