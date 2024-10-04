package main

import (
	"codeflare/internal/adapters/handlers"
	"codeflare/internal/adapters/repository"
	"codeflare/internal/config"
	"codeflare/internal/core/services"
	"github.com/labstack/echo/v4"
	"fmt"
)

func main() {
	cfg := config.LoadConfig()
	db, err := repository.NewPGStore(cfg.DatabaseURL)
	if err != nil {
		fmt.Println("gg")
		return
	}

	deployService := services.NewDeployService(db)

	h := handlers.NewApiHandler(deployService)
	
	e := echo.New()
	e.GET("/", h.HomeHandler)
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", cfg.ServerPort)))
}