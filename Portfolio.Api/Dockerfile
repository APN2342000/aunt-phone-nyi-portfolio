# --- Build stage ---
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY Portfolio.Api.csproj ./
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o /app --no-restore

# --- Runtime stage ---
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app .

ENV ASPNETCORE_ENVIRONMENT=Production
# Render (and most free hosts) inject PORT at runtime; Program.cs reads it
# and binds Kestrel accordingly. 8080 is just the documented default.
EXPOSE 8080

ENTRYPOINT ["dotnet", "Portfolio.Api.dll"]
