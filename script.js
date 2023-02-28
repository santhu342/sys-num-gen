const arrayRange = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step );
function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}
    $(document).ready(function(){
        $("#btnSubmit").click(function(){
            const txt = $("#labname").val()
            
            var num = $("#num").val()
            var finalNum = []
            if(num == "" || txt == "")
            swal.fire("Fail","No data found","error")
            else
            {
                num = num.split(",")
                for(i=0;i<num.length;i++){
                    var val = num[i].split("-")
                    if(val == ""){}
                    else
                    if(val.length == 2)
                    {
                        val.sort(function(a, b){return a-b})
                        var val1 = parseInt(val[0]),val2 = parseInt(val[1])
                        finalNum.push(arrayRange(val1, val2, 1))
                    }
                    else
                    finalNum.push(parseInt(val))
                }
                
                
        w = '1000', h = '800',left = (screen.width/2)-(w/2),top = (screen.height/2)-(h/2);
        var title = "Feedback Report View";
        var option = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width="+w+", height="+h+", top="+top+", left="+left;
        
        finalNum = (Array.from(new Set(flatten(finalNum).sort(function(a, b){return a-b}))))
        
        var div = "<table border='0' >"
        for(i=0;i<finalNum.length;i++){
            
            div = div + "<tr><td class='tdbor'>"+ ("000"+finalNum[i]).slice(-2)
                      + "</td>   <td class='tdemp'></td>   <td  class='tdbor'>" + ("000"+finalNum[i]).slice(-2)
                      + "</td>   <td></td>   <td class='tdemp'>"
                      
                      + "<table border='0'><tr> <td  class='tdsm'>"+ txt + ("000"+finalNum[i]).slice(-3)
                      + "</td> </tr> <tr> <td class='tdemp'></td> </tr> <tr> <td  class='tdsm'>"+ txt +  ("000"+finalNum[i]).slice(-3)
                      + "</td> </tr></table>" 
                      + "</tr>"
                      + "<tr><td class='tdemp' colspan='6'></td></tr>"
                    
        }
        div = div + "</table>"
        
        div = div + "<style>"
                  +  ".tdbor{border: 7px solid;padding: 60px; font-size: 55px; font-weight: 900; text-align: center;}"
                  +  ".tdsm{border: 5px solid;padding: 8px 100px; font-weight: 900;font-size: 25px; text-transform: uppercase;}"
                  +  ".tdemp{padding: 20px 20px;}"
                  +  "</style>"
            w = window.open("about:blank",title,option)
            w.document.open();
            w.document.write(div);
            
            }
        })
    })
 