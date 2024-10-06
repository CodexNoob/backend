/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import {connectToDatabase} from "@/helpers/sever-helpers";
import prisma from "@/prisma";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {

try {
        const {name, email, password } = await req.json();
        if(!name||!email||!password) 
        return NextResponse.json({ message:"Invalid Data" }, { status: 422 });
        const hashedPassword = bcrypt.hash(password,10)
        await connectToDatabase()
        const user = await prisma.user.create({
            data:{ email, name, hashedPassword },
        });
    return NextResponse.json({ user }, {status: 201});
 } catch (error) {
    console.log(error);

        return NextResponse.json({ message: "Server Error"}, {status: 500});
   }finally{
        await prisma.$disconnect();
   }
};