"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesCustomer = exports.getSales = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getSales = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let queryTable = 'SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct';
    let salesList;
    connection_1.default.query(queryTable).then((values) => {
        if (values[0].length > 0) {
            salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
            response.status(200).json(salesList);
        }
        else {
            response.status(404).send({ msg: 'No hay ventas registradas' });
        }
    });
});
exports.getSales = getSales;
// export const getSalesCustomer = async (req: Request, res: Response) => {
//   const idCustomer = req.params.id
//   const salesUser = await Sales.findAll({
//     where: {
//       idCustomer: idCustomer
//     }
//   });
//   res.status(200).json({
//     body: salesUser
//   });
// }
const getSalesCustomer = (req, res) => {
    let querySearch = "SELECT * FROM sales INNER JOIN products ON products.id = sales.idProduct WHERE idCustomer = ?;";
    let salesList;
    connection_1.default.query({
        query: querySearch,
        values: [req.params.id]
    }).then((values) => {
        if (values[0].length > 0) {
            salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
            res.status(200).json(salesList);
        }
        else {
            res.status(404).send({ msg: 'No hay ventas registradas' });
        }
    });
};
exports.getSalesCustomer = getSalesCustomer;
