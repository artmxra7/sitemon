<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof \Spatie\Permission\Exceptions\UnauthorizedException) {
            auth()->guard()->logout();

            $request->session()->invalidate();

            return redirect('/login')->with('error', 'You do not have permission to access this module');
        }

        if ($this->isHttpException($exception)) {
            switch ($exception->getStatusCode()) {
                case 404:
                    return response()->view('errors.404', [], $exception->getStatusCode());
                    break;
                case 405:
                    return response()->view('errors.405', [], $exception->getStatusCode());
                    break;
            }
        }

        return parent::render($request, $exception);
    }

    protected function unauthenticated($request, AuthenticationException $exception)

    {

        if ($request->expectsJson()) {

            /** return response()->json(['error' => 'Unauthenticated.'], 401); */

            	$response = ['code' => 2, 'success' => FALSE,'message' => 'invalid token'];

            	return response()->json($response);

        }

        return redirect()->guest('login');

    }
}
