
### MANUAL APP START CLI COMMANDS

.PHONY: run-server
run-server:
	@echo Starting server
	cd server && \
		fastapi dev app/main.py


.PHONY: run-client
run-client:
	@echo Starting react client
	cd client && \
		npm run dev

