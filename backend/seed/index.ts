import mongoose from "mongoose";
import Admin from "../app/admins/model";
import Bank from "../app/banks/model";
import Category from "../app/categories/model";
import Nominal from "../app/nominals/model";
import PaymentMethod from "../app/payment-methods/model";
import Transaction from "../app/transactions/model";
import Voucher from "../app/vouchers/model";

/**
 * Fill the database with initial documents.
 * @returns The inserted documents.
 */
export default async function seed() {
  const mobile = new Category({ name: "Mobile" });
  const desktop = new Category({ name: "Desktop" });
  const console = new Category({ name: "Console" });
  const categoriesInsertion = Category.insertMany([mobile, desktop, console]);

  const gold50 = new Nominal({
    name: "Gold",
    quantity: 50,
    price: 1_250_000,
  });
  const gold100 = new Nominal({
    name: "Gold",
    quantity: 100,
    price: 2_250_000,
  });
  const gold125 = new Nominal({
    name: "Gold",
    quantity: 125,
    price: 3_250_000,
  });
  const gold500 = new Nominal({
    name: "Gold",
    quantity: 500,
    price: 5_000_000,
  });
  const gold225 = new Nominal({
    name: "Gold",
    quantity: 225,
    price: 4_250_000,
  });
  const jewel50 = new Nominal({
    name: "Jewel",
    quantity: 50,
    price: 75_000,
  });
  const jewel100 = new Nominal({
    name: "Jewel",
    quantity: 100,
    price: 125_000,
  });
  const jewel150 = new Nominal({
    name: "Jewel",
    quantity: 150,
    price: 150_000,
  });
  const jewel225 = new Nominal({
    name: "Jewel",
    quantity: 225,
    price: 175_000,
  });
  const jewel500 = new Nominal({
    name: "Jewel",
    quantity: 500,
    price: 325_000,
  });
  const diamond50 = new Nominal({
    name: "Diamond",
    quantity: 50,
    price: 125_000,
  });
  const diamond100 = new Nominal({
    name: "Diamond",
    quantity: 100,
    price: 225_000,
  });
  const diamond150 = new Nominal({
    name: "Diamond",
    quantity: 150,
    price: 300_000,
  });
  const diamond300 = new Nominal({
    name: "Diamond",
    quantity: 300,
    price: 400_000,
  });
  const diamond500 = new Nominal({
    name: "Diamond",
    quantity: 500,
    price: 500_000,
  });
  const nominalInsertion = Nominal.insertMany([
    gold50,
    gold100,
    gold125,
    gold500,
    gold225,
    jewel50,
    jewel100,
    jewel150,
    jewel225,
    jewel500,
    diamond50,
    diamond100,
    diamond150,
    diamond300,
    diamond500,
  ]);

  const bsi = new Bank({
    name: "Bank Syariah Indonesia",
    holderName: "Amir Muhammad Hakim",
    holderNumbers: "22081544",
  });
  const bsm = new Bank({
    name: "Bank Syariah Mandiri",
    holderName: "Muhammad Avdol",
    holderNumbers: "77542493",
  });
  const bnis = new Bank({
    name: "Bank BNI Syariah",
    holderName: "Jotaro Kujo",
    holderNumbers: "99888443",
  });
  const bankInsertion = Bank.insertMany([bsi, bsm, bnis]);

  await Promise.all([categoriesInsertion, nominalInsertion, bankInsertion]);

  const superMechs = new Voucher({
    name: "Super Mechs",
    category: console.id,
    imageName: "super-mechs.png",
    nominals: [gold50.id, gold100.id, gold125.id, gold500.id, gold225.id],
  });
  const codMW = new Voucher({
    name: "Call of Duty: Modern",
    category: desktop.id,
    imageName: "cod-mw.png",
    nominals: [jewel50.id, jewel100.id, jewel150.id, jewel225.id, jewel500.id],
  });
  const mobileLegends = new Voucher({
    name: "Mobile Legends",
    imageName: "mobile-legends.png",
    category: mobile.id,
    nominals: [
      diamond50.id,
      diamond100.id,
      diamond150.id,
      diamond300.id,
      diamond500.id,
    ],
  });
  const coc = new Voucher({
    name: "Clash of Clans",
    imageName: "clash-of-clans.png",
    category: mobile.id,
    nominals: [gold50.id, gold100.id, gold125.id, gold500.id, gold225.id],
  });
  const valorant = new Voucher({
    name: "Valorant",
    imageName: "valorant.png",
    category: desktop.id,
    nominals: [gold50.id, gold100.id, gold125.id, gold500.id, gold225.id],
  });
  const voucherInsertion = Voucher.insertMany([
    superMechs,
    codMW,
    mobileLegends,
    coc,
    valorant,
  ]);

  const transfer = new PaymentMethod({
    name: "Tranfer",
    banks: [bsi.id, bsm.id],
  });
  const visa = new PaymentMethod({
    name: "VISA",
    banks: [bnis.id],
  });
  const paymentMethodInsertion = PaymentMethod.insertMany([transfer, visa]);

  await Promise.all([voucherInsertion, paymentMethodInsertion]);

  const septianTransaction = new Transaction({
    voucher: {
      name: mobileLegends.name,
      imageName: mobileLegends.imageName,
    },
    category: {
      current: mobile.id,
      name: mobile.name,
    },
    nominal: {
      name: gold50.name,
      quantity: gold50.quantity,
      price: gold50.price,
    },
    paymentMethod: transfer.name,
    bank: {
      name: bsi.name,
      holderName: bsi.holderName,
      holderNumbers: bsi.holderNumbers,
    },
    taxRate: 10 / 100,
    member: {
      // TODO: Replace with data from Player collection
      current: new mongoose.Types.ObjectId(),
      fullName: "Septian Saputra",
      gameId: "septian_gaming",
    },
    status: "Accepted",
  });
  const handiTransaction = new Transaction({
    voucher: {
      name: valorant.name,
      imageName: valorant.imageName,
    },
    category: {
      current: desktop.id,
      name: desktop.name,
    },
    nominal: {
      name: gold225.name,
      quantity: gold225.quantity,
      price: gold225.price,
    },
    paymentMethod: transfer.name,
    bank: {
      name: bsm.name,
      holderName: bsm.holderName,
      holderNumbers: bsm.holderNumbers,
    },
    taxRate: 5 / 100,
    member: {
      // TODO: Replace with data from Player collection
      current: new mongoose.Types.ObjectId(),
      fullName: "Handi Fajar Setiawan",
      gameId: "mhansgaming",
    },
  });
  const andreTransaction = new Transaction({
    voucher: {
      name: superMechs.name,
      imageName: superMechs.imageName,
    },
    category: {
      current: console.id,
      name: console.name,
    },
    nominal: {
      name: gold500.name,
      quantity: gold500.quantity,
      price: gold500.price,
    },
    paymentMethod: visa.name,
    bank: {
      name: bnis.name,
      holderName: bnis.holderName,
      holderNumbers: bnis.holderNumbers,
    },
    taxRate: 12 / 100,
    member: {
      // TODO: Replace with data from Player collection
      current: new mongoose.Types.ObjectId(),
      fullName: "Andre Saputra",
      gameId: "ndreee",
    },
    status: "Rejected",
  });
  const transactionsInsertion = Transaction.insertMany([
    septianTransaction,
    handiTransaction,
    andreTransaction,
  ]);

  const amir = new Admin({
    email: "amir.muh.hakim@gmail.com",
    fullName: "Amir Muhammad Hakim",
    password: "jajaja",
  });
  const adminCreation = amir.save();

  await Promise.all([transactionsInsertion, adminCreation]);

  return {
    categories: { mobile, desktop, console },
    nominals: {
      gold50,
      gold100,
      gold125,
      gold500,
      gold225,
      jewel50,
      jewel100,
      jewel150,
      jewel225,
      jewel500,
      diamond50,
      diamond100,
      diamond150,
      diamond300,
      diamond500,
    },
    vouchers: { superMechs, codMW, mobileLegends, coc, valorant },
    banks: { bsi, bsm, bnis },
    paymentMethods: { transfer, visa },
    transactions: {},
    admins: { amir },
    members: {},
  };
}