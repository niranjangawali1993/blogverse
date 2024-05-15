import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  const authToken = request.cookies.has('authToken');
  console.log('AUTH TOKEN - ', authToken);
  if (
    request.nextUrl.pathname == '/api/login' ||
    request.nextUrl.pathname == '/api/signup' ||
    request.nextUrl.pathname == '/api/tags' ||
    request.nextUrl.pathname == '/api/blogs'
  ) {
    return;
  }

  const isPublicPaths = [
    '/',
    '/login',
    '/signup',
    '/about',
    '/membership',
    '/partner-program',
  ].includes(request.nextUrl.pathname);

  if (isPublicPaths) {
    // Accessing not secured route
    if (authToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    // Accessing secured route
    console.log('When path is not public');
    console.log(authToken);
    if (!authToken) {
      if (request.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.json(
          {
            message: 'Access Denied !!!',
            success: false,
          },
          {
            status: 401,
          }
        );
      }
      return NextResponse.redirect(new URL('/', request.url));
    } else {
      // verify token
    }
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/about',
    '/membership',
    '/partner-program',
    '/create-blog',
    '/edit-blog',
    '/dashboard/:path*',
    '/api/:path*',
  ],
};
