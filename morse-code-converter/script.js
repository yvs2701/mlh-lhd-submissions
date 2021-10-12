const input = document.getElementById("input");
const output = document.getElementById("output");

const tx = document.getElementsByTagName("textarea");
for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("change", resize, false);
}
function resize() {
    console.log(this)
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}

var AlphaNumeric = [], morse = [];

AlphaNumeric[0] = "A"; AlphaNumeric[1] = "B"; AlphaNumeric[2] = "C"; AlphaNumeric[3] = "D"; AlphaNumeric[4] = "E";
AlphaNumeric[5] = "F"; AlphaNumeric[6] = "G"; AlphaNumeric[7] = "H"; AlphaNumeric[8] = "I"; AlphaNumeric[9] = "J";
AlphaNumeric[10] = "K"; AlphaNumeric[11] = "L"; AlphaNumeric[12] = "M"; AlphaNumeric[13] = "N"; AlphaNumeric[14] = "O";
AlphaNumeric[15] = "P"; AlphaNumeric[16] = "Q"; AlphaNumeric[17] = "R"; AlphaNumeric[18] = "S"; AlphaNumeric[19] = "T";
AlphaNumeric[20] = "U"; AlphaNumeric[21] = "V"; AlphaNumeric[22] = "W"; AlphaNumeric[23] = "X";
AlphaNumeric[24] = "Y"; AlphaNumeric[25] = "Z"; AlphaNumeric[26] = "0"; AlphaNumeric[27] = "1"; AlphaNumeric[28] = "2";
AlphaNumeric[29] = "3"; AlphaNumeric[30] = "4"; AlphaNumeric[31] = "5"; AlphaNumeric[32] = "6"; AlphaNumeric[33] = "7";
AlphaNumeric[34] = "8"; AlphaNumeric[35] = "9"; AlphaNumeric[36] = " ";
// assigning the corresponding morse code for each letter and number to  morse[] array
morse[0] = ".-"; morse[1] = "-..."; morse[2] = "-.-."; morse[3] = "-.."; morse[4] = "."; morse[5] = "..-."; morse[6] = "--.";
morse[7] = "...."; morse[8] = ".."; morse[9] = ".---"; morse[10] = "-.-"; morse[11] = ".-..";
morse[12] = "--"; morse[13] = "-."; morse[14] = "---"; morse[15] = ".--."; morse[16] = "--.-"; morse[17] = ".-."; morse[18] = "...";
morse[19] = "-"; morse[20] = "..-"; morse[21] = "...-";
morse[22] = ".--"; morse[23] = "-..-"; morse[24] = "-.--"; morse[25] = "--.."; morse[26] = "-----"; morse[27] = ".----";
morse[28] = "..---"; morse[29] = "...--"; morse[30] = "....-";
morse[31] = "....."; morse[32] = "-...."; morse[33] = "--..."; morse[34] = "---.."; morse[35] = "----."; morse[36] = "/";

input.addEventListener("keyup", () => {
    const _input = input.value;
    var index = -1, ch, _output = "";
    for (let i = 0; i < _input.length; i++) {
        ch = _input.charAt(i).toUpperCase();
        if (ch == '\n') {
            _output += "\n";
        } else {
            index = AlphaNumeric.indexOf(ch);
            if (index !== -1)
                _output += morse[index] + " ";
        }
    }
    output.value = _output;
});
output.addEventListener("keyup", () => {
    const _input = output.value.split(/\s+/);
    var index = -1, _output = "";
    _input.forEach(elem => {
        index = morse.indexOf(elem);
        if (index !== -1)
            _output += AlphaNumeric[index];
    });
    input.value = _output;
});
