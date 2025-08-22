<template>
  <div class="home-page">
    <div class="welcome-section">
      <h1 class="page-title">Bem-vindo ao Arena</h1>
      <p class="page-subtitle">Gerencie suas partidas e calendário de forma simples</p>
    </div>

    <div class="content-grid">
      <div class="card">
        <div class="card-header">
          <v-icon class="card-icon">mdi-calendar-check</v-icon>
          <h3>Próximas Partidas</h3>
        </div>
        <div class="card-content">
          <p>Nenhuma partida agendada para esta semana</p>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <v-icon class="card-icon">mdi-soccer</v-icon>
          <h3>Últimas Partidas</h3>
        </div>
        <div class="card-content">
          <p>Histórico de partidas jogadas</p>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <v-icon class="card-icon">mdi-account-group</v-icon>
          <h3>Equipe</h3>
        </div>
        <div class="card-content">
          <p>Gerencie sua equipe</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Home page component
</script>

<style lang="scss" scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.page-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.card-icon {
  color: #1B5E20;
  font-size: 24px;
}

.card-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.card-content p {
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .card {
    padding: 20px;
  }

  .welcome-section {
    padding: 20px 0;
    margin-bottom: 24px;
  }
}
</style>
