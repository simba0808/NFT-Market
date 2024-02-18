import { connect } from "@/app/config/dbConfig";
import User from "@/app/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if(user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    
    return NextResponse.json({ message: "User created successfully", success: true, savedUser }, { status: 200 });

  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}