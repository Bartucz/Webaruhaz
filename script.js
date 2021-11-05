$(function(){

class Termek{
    
    constructor(nev,leiras,ar,kep) {
        this.nev = nev;
        this.leiras = leiras;
        this.ar = ar;
        this.kep = kep;
       
      } 
 





}






    const termekClassok=[];
    const kosar=[];
    jsonbeolvas("termekek.json",termekClassok, tablaba);

    function jsonbeolvas(fajlnev, tomb, callback)
    {
      $.ajax
        (
            { url: fajlnev, 
                success: function(result)
                {
                    result.forEach((value) => {
                        let tempClass= new Termek(value.nev,value.leiras,value.ar,value.kep);
                        
                        tomb.push(tempClass);});
                    callback();                                      
                }
            }
        );
    }

    function tablaba()
    {
        $("article div").eq(0).append("<table>");
        var txt="<tr id='fejlec'><th>Terméknév</th><th>Leírás</th><th>Ár</th></tr>";
        
        termekClassok.forEach(function(value, index){
            
            txt += "<tr id='" + index + "'>";
            
            for (let item in value) {
              if(item=="kep"){


                txt +='<td>'+'<img src='+(value[item])+' alt="kép"'+'</td>';
              }
                else{
              
              txt += "<td>" + value[item] + "</td>";
                }
            }
            txt+='<td class="kosarba" id="'+(index)+'"><form><input type="button" name="kosarba" value="Kosárba"></form></td>';
            
            txt += "</tr>";
            
        });
        $("article table").html(txt);
        $(".kosarba").on("click",  KosarhozAd);
        $(".torol").on("click",  Torles);
    }
    function KosarhozAd(){
        console.log("kosárhoz adva");
        
        kosar.push({nev:termekClassok[$(this).attr("id")].nev,ar:termekClassok[$(this).attr("id")].ar});
        console.log(kosar);

        $("aside").eq(0).empty();
        KosarTabla();

            
       
    }
    function KosarTabla(){
        $("aside").eq(0).empty();

        $("aside ").eq(0).append("<table>");
        var txt="<tr id='fejlec'><th>A Kosár tartalma</th></tr>";
        var osszeg=0;
        kosar.forEach(function(value, index){
            
            txt += "<tr id='" + index + "'>";
            
            
                
              txt += "<td>" + value.nev + "</td>";
              txt += "<td>" + value.ar + "</td>";
              osszeg +=value.ar;
           
           
            txt+='<td class="torol" id="'+(index)+'"><form><input type="button" name="torol" value="Töröl"></form></td>';
            txt += "</tr>";
            
            
        });
        txt +="<td>Összesen:   " + osszeg + "</td>";
        $("aside table").html(txt);
        
        $(".torol").on("click",  Torles);
    }
    function Torles(){
        index=$(this).attr("id");
        kosar.splice(index,1);
        $("aside").eq(0).empty();
        KosarTabla();
        


    }


});