<?php

declare(strict_types=1);

namespace App\Application\Actions\Home;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\StreamFactoryInterface;
use Slim\Exception\HttpBadRequestException;
use Slim\Exception\HttpNotFoundException;

class HomeAction
{
    public function __construct(
        private readonly StreamFactoryInterface $streamFactory
    ) {
    }

    /**
     * @throws HttpNotFoundException
     * @throws HttpBadRequestException
     */
    public function __invoke(Request $request, Response $response, array $args): Response
    {
        $stream = $this->streamFactory->createStreamFromFile(__DIR__ . '/../../../../public/dist/index.html');
        return $response->withBody($stream);
    }
}
