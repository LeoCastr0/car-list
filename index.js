import express from 'express';
import {promises as fs} from 'fs';

const app = express();
app.use(express.json());

const list = JSON.parse(await fs.readFile('./car-list.json'));

let modelos = list
    .filter((item) => item.brand)
    .map((item) => item.models.length);

//console.log(modelos); // quantidade de modelos por marca

//maisModelos
function max(input) {
        if (toString.call(input) !== "[object Array]"){
          return false;
        }else{
          return Math.max.apply(null, input);
        }
       }
const maisModelos = list
    .filter((item) => item.models.length == max(modelos))
    .map((item) => item.brand);
    console.log('Quem possui mais modelos?', maisModelos);

//menosModelos
function min(input) {
    if (toString.call(input) !== "[object Array]"){
      return false;
    }else{
      return Math.min.apply(null, input);
    }
   }
const menosModelos = list
    .filter((item) => item.models.length == min(modelos))
    .map((item) => item.brand);
    console.log('Quem possui menos modelos?', menosModelos);

//marcas com mais modelos
const listaMaisModelos = list
    .sort((a, b)=> b.models.length - a.models.length) // ordena por tamanho do modelo.
    .sort((a, b) => {
        if(a.models.length == b.models.length){
            return -1;
        }else if (a.models.length > b.models.length){ //ordena por ordem alfabetica
            return 1;
        }   
    })
    .map((item) =>item.brand + '-' + item.models.length);
    console.log('Cinco marcas com mais modelos:', listaMaisModelos.slice(0, 5));
    
//precisa da quantidade e trocar de ordem Volkswagen com Fiat

//marcas com menos modelos
const listaMenosModelos = list
    .sort((a, b) => a.models.length - b.models.length)
    .sort((a, b) => {
        if(a.models.length == b.models.length){
            return -1;
        }else if (a.models.length < b.models.length){
            return 1;
        }   
    })
    .map((item) => item.brand + '-' + item.models.length);
    console.log('Cinco marcas com menos modelos:', listaMenosModelos.slice(0, 5));
    //já veio em ordem correta, só precisa das quantidades



function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

//console.log(capitalize('FIAT'));

let marca = 'Honda';


const nomeMarca = list
    .filter((item)=> item.brand == capitalize(marca))
    .map((item)=> item.models);

console.log(nomeMarca);

app.get("/marcas/maisModelos", (req, res) =>{
    res.send(maisModelos);
});

app.get("/marcas/menosModelos", (req, res) =>{
    res.send(menosModelos);
});

app.get("/marcas/listaMaisModelos/:x", (req, res) =>{
    res.send(listaMaisModelos.slice(0, req.params.x));
});

app.get("/marcas/listaMenosModelos/:x", (req, res) =>{
    res.send(listaMenosModelos.slice(0, req.params.x));
});
/*
app.post("/marcas/listaModelos/:nomeMarca",(req, res) =>{
    //console.log(req.params.nomeMarca);
    res.send(nomeMarca(req.params.nomeMarca));
});*/


app.listen(3000, () => {
    console.log('API started');
});