DE=docker exec -it -u node nest_pdf

application:
	make install --no-print-directory

bash:
	@$(DE) bash

down:
	docker compose down

install:
	cp .env.dist .env
	docker compose up -d --build

logs:
	docker logs -f nest_pdf

root:
	@echo '🕷 With great power comes great responsibility! 🕷'
	@docker exec -u root -it nest_pdf bash

stop:
	docker compose stop

up:
	docker compose up -d
