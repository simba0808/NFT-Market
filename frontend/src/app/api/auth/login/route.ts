import { connect } from "@/app/config/dbConfig";
import User from "@/app/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if(!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if(!isMatch) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

    const response = NextResponse.json({ 
      message: "Login successful", 
      success: true 
    });
    response.cookies.set("token", token, {
      httpOnly: true
    });

    return response;

  } catch(err: any) {
  }
}