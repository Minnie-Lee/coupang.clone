import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth';

// GET /api/auth/kakao - Kakao OAuth 로그인 시작
export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.KAKAO_CLIENT_ID;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/kakao/callback`;

    if (!clientId) {
      return NextResponse.json(
        { error: 'Kakao OAuth not configured' },
        { status: 500 }
      );
    }

    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=account_email`;

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Kakao OAuth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
