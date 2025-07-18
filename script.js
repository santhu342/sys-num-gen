const arrayRange = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const flatten = arr => arr.reduce((flat, item) =>
    flat.concat(Array.isArray(item) ? flatten(item) : item), []);

$(document).ready(function () {
    $("#btnSubmit").click(function () {
        const labName = $("#labname").val().trim();
        let numbers = $("#num").val().trim();

        if (!labName || !numbers) {
            return Swal.fire("Fail", "No data found", "error");
        }

        let finalNumbers = [];

        numbers.split(",").forEach(item => {
            let range = item.split("-");
            if (range.length === 2) {
                let [start, end] = range.map(Number).sort((a, b) => a - b);
                finalNumbers.push(arrayRange(start, end, 1));
            } else {
                finalNumbers.push(parseInt(item));
            }
        });

        finalNumbers = Array.from(new Set(flatten(finalNumbers).sort((a, b) => a - b)));

        let table = "<table border='0'>";
        finalNumbers.forEach(num => {
            let formatted = ("000" + num).slice(-3);
            let block = `
                <table border='0'>
                    <tr><td class='tdsm'>${labName}${formatted}</td></tr>
                    <tr><td class='tdemp'></td></tr>
                    <tr><td class='tdsm'>${labName}${formatted}</td></tr>
                </table>`;
            table += `<tr><td class='tdemp'>${block}</td><td class='tdemp'>${block}</td></tr>
                      <tr><td class='tdemp' colspan='6'></td></tr>`;
        });
        table += "</table>";

        let style = `
            <style>
                .tdsm { border: 5px solid; padding: 8px 100px; font-weight: 900; font-size: 25px; text-transform: uppercase; }
                .tdemp { padding: 20px 20px; }
            </style>`;

        let win = window.open("", "Feedback Report View", "width=1000,height=800,scrollbars=yes");
        win.document.write(table + style);
    });
});