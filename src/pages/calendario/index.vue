<template>
  <v-container class="calendar-page" fluid>
    <div class="page-header">
      <div class="page-header__title">
        <h1 class="page-header__heading">{{ t('agendaPartidas') }}</h1>
      </div>
      <v-spacer />
      <arn-button bg-color="#1b5e20" class="page-header__create" radius="24px">
        <v-icon class="mr-2">mdi-plus</v-icon>
        {{ t('criarPartida') }}
      </arn-button>
    </div>

    <v-row align="stretch" class="calendar-content" no-gutters>
      <v-col class="pr-lg-6" cols="12" lg="8">
        <arn-card class="calendar-card" color="#ebf0ea" elevation="0" rounded="xl">
          <template #header>
            <div class="calendar-card__header">
              <div>
                <span class="calendar-card__label">
                  <v-icon class="mr-2" color="primary-color-300" size="20">mdi-calendar-blank</v-icon>
                  {{ formattedMonth }}
                </span>
              </div>
              <div class="calendar-card__actions">
                <v-btn
                  color="primary-color-300"
                  icon="mdi-chevron-left"
                  size="small"
                  variant="tonal"
                  @click="goToPreviousMonth"
                />
                <v-btn
                  color="primary-color-300"
                  icon="mdi-chevron-right"
                  size="small"
                  variant="tonal"
                  @click="goToNextMonth"
                />
              </div>
            </div>
          </template>

          <template #content>
            <div class="calendar-grid">
              <div
                v-for="weekday in weekdays"
                :key="weekday"
                class="calendar-grid__weekday"
              >
                {{ weekday }}
              </div>

              <div
                v-for="day in flattenedCalendar"
                :key="day.isoDate"
                class="calendar-grid__day"
                :class="{
                  'calendar-grid__day--outside': !day.inCurrentMonth,
                  'calendar-grid__day--today': day.isToday,
                }"
              >
                <div class="calendar-grid__day-header">
                  <span class="calendar-grid__day-number">{{ day.date.getDate() }}</span>
                </div>
                <div class="calendar-grid__events">
                  <v-chip
                    v-for="event in day.events"
                    :key="event.id"
                    class="calendar-event"
                    :class="statusClass(event.status)"
                    label
                    size="small"
                  >
                    <span class="calendar-event__time">{{ event.time }}</span>
                  </v-chip>
                </div>
              </div>
            </div>
          </template>
        </arn-card>
      </v-col>
      <v-col cols="12" lg="4">
        <arn-card class="info-card" color="#ebf0ea" elevation="0" rounded="xl">
          <template #header>
            <h2 class="info-card__title">{{ t('legenda') }}</h2>
          </template>
          <template #content>
            <div class="info-card__legend">
              <div
                v-for="item in statusLegend"
                :key="item.status"
                class="info-card__legend-item"
              >
                <span :class="['legend-dot', statusClass(item.status)]" />
                <span class="legend-label">{{ item.label }}</span>
              </div>
            </div>
          </template>
        </arn-card>

        <arn-card class="info-card" color="#ebf0ea" elevation="0" rounded="xl">
          <template #header>
            <h2 class="info-card__title">{{ t('proximasPartidas') }}</h2>
            <span class="info-card__subtitle">{{ t('suasPartidasConfirmadas') }}</span>
          </template>
          <template #content>
            <div class="info-card__list">
              <v-sheet
                v-for="match in upcomingMatches"
                :key="match.id"
                class="info-card__list-item"
                color="#f7fdf8"
                rounded="lg"
              >
                <div>
                  <strong>{{ match.name }}</strong>
                  <p class="mb-0">{{ formatMatchDate(match) }}</p>
                </div>
                <v-chip
                  :class="statusClass(match.status)"
                  label
                  size="small"
                >
                  {{ statusLabel(match.status) }}
                </v-chip>
              </v-sheet>
            </div>
          </template>
        </arn-card>

        <arn-card class="info-card" color="#ebf0ea" elevation="0" rounded="xl">
          <template #header>
            <h2 class="info-card__title">{{ t('estatisticasMes') }}</h2>
          </template>
          <template #content>
            <div class="info-card__stats">
              <div class="info-card__stat">
                <span class="info-card__stat-value">{{ stats.created }}</span>
                <span class="info-card__stat-label">{{ t('partidasCriadas') }}</span>
              </div>
              <div class="info-card__stat">
                <span class="info-card__stat-value">{{ stats.participated }}</span>
                <span class="info-card__stat-label">{{ t('partidasParticipadas') }}</span>
              </div>
              <div class="info-card__stat">
                <span class="info-card__stat-value">{{ stats.hours }}h</span>
                <span class="info-card__stat-label">{{ t('horasJogadas') }}</span>
              </div>
            </div>
          </template>
        </arn-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { t, locale } = useI18n()

  const calendarDate = ref(new Date(2024, 0, 1))

  const matches = ref([
    {
      id: 1,
      name: 'Pelada da Quinta',
      date: '2024-01-17',
      time: '19:00',
      status: 'confirmed',
    },
    {
      id: 2,
      name: 'Racha da Galera',
      date: '2024-01-20',
      time: '15:30',
      status: 'waiting',
    },
    {
      id: 3,
      name: 'Futebol Society',
      date: '2024-01-21',
      time: '20:00',
      status: 'confirmed',
    },
    {
      id: 4,
      name: 'Torneio Relâmpago',
      date: '2024-01-25',
      time: '09:00',
      status: 'full',
    },
    {
      id: 5,
      name: 'Amistoso de Sábado',
      date: '2024-01-27',
      time: '10:00',
      status: 'waiting',
    },
  ])

  const stats = reactive({
    created: 2,
    participated: 5,
    hours: 12,
  })

  const statusLegend = computed(() => ([
    { status: 'confirmed', label: t('statusConfirmada') },
    { status: 'waiting', label: t('statusAguardando') },
    { status: 'full', label: t('statusLotada') },
  ]))

  const eventsByDate = computed(() => {
    return matches.value.reduce((acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = []
      }
      acc[event.date].push(event)
      acc[event.date].sort((a, b) => a.time.localeCompare(b.time))
      return acc
    }, {})
  })

  const formattedMonth = computed(() => {
    const formatter = new Intl.DateTimeFormat(locale.value, {
      month: 'long',
      year: 'numeric',
    })
    return formatter.format(calendarDate.value)
  })

  const weekdays = computed(() => {
    const baseDate = new Date(2024, 0, 7)
    const formatter = new Intl.DateTimeFormat(locale.value, { weekday: 'short' })
    return Array.from({ length: 7 }, (_, index) => {
      const current = new Date(baseDate)
      current.setDate(baseDate.getDate() + index)
      return formatter.format(current)
    })
  })

  const flattenedCalendar = computed(() => {
    const year = calendarDate.value.getFullYear()
    const month = calendarDate.value.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const startDayOfWeek = firstDayOfMonth.getDay()
    const startDate = new Date(year, month, 1 - startDayOfWeek)

    const lastDayOfMonth = new Date(year, month + 1, 0)
    const endDayOfWeek = lastDayOfMonth.getDay()
    const endDate = new Date(lastDayOfMonth)
    endDate.setDate(lastDayOfMonth.getDate() + (6 - endDayOfWeek))

    const numberOfDays = Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000)) + 1

    const today = new Date()
    const cells = []

    for (let i = 0; i < numberOfDays; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      const isoDate = formatISO(currentDate)
      const inCurrentMonth = currentDate.getMonth() === month
      const events = eventsByDate.value[isoDate] || []
      const isToday = currentDate.toDateString() === today.toDateString()

      cells.push({
        date: currentDate,
        isoDate,
        inCurrentMonth,
        events,
        isToday,
      })
    }

    return cells
  })

  const upcomingMatches = computed(() => {
    const now = new Date()
    return matches.value
      .filter(event => event.status === 'confirmed')
      .filter(event => toDate(event.date) >= now)
      .sort((a, b) => toDate(a.date) - toDate(b.date))
      .slice(0, 3)
  })

  function goToPreviousMonth () {
    const date = new Date(calendarDate.value)
    date.setMonth(date.getMonth() - 1)
    calendarDate.value = new Date(date.getFullYear(), date.getMonth(), 1)
  }

  function goToNextMonth () {
    const date = new Date(calendarDate.value)
    date.setMonth(date.getMonth() + 1)
    calendarDate.value = new Date(date.getFullYear(), date.getMonth(), 1)
  }

  function statusClass (status) {
    return {
      'status--confirmed': status === 'confirmed',
      'status--waiting': status === 'waiting',
      'status--full': status === 'full',
    }
  }

  function statusLabel (status) {
    switch (status) {
      case 'confirmed': {
        return t('statusConfirmada')
      }
      case 'waiting': {
        return t('statusAguardando')
      }
      case 'full': {
        return t('statusLotada')
      }
      default: {
        return status
      }
    }
  }

  function formatMatchDate (match) {
    const formatter = new Intl.DateTimeFormat(locale.value, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    return `${formatter.format(toDate(match.date))} ${t('as')} ${match.time}`
  }

  function formatISO (date) {
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  function toDate (dateString) {
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day)
  }
</script>

<style scoped lang="scss">
.calendar-page {
  min-height: 100vh;
  padding: 32px 24px 48px;
  background: #ffffff;
  border-radius: 16px;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
}

.page-header__back {
  color: #4a5568;
  font-weight: 500;
}

.page-header__title {
  display: flex;
  flex-direction: column;
}

.page-header__subtitle {
  font-size: 14px;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.page-header__heading {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #0a0a0a;
}

.page-header__create {
  font-weight: 600;
  text-transform: none;
  padding: 12px 24px;
  font-size: 16px;
  height: fit-content;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.calendar-content {
  margin-top: 32px;
}

.calendar-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.calendar-card__label {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: #0f172a;
}

.calendar-card__actions {
  display: flex;
  gap: 8px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
}

.calendar-grid__weekday {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: #94a3b8;
  text-align: center;
}

.calendar-grid__day {
  min-height: 110px;
  border-radius: 18px;
  background: #f8fafc;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s ease;
}

.calendar-grid__day--outside {
  opacity: 0.4;
}

.calendar-grid__day--today {
  border: 1.5px solid #1b5e20;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar-grid__day:hover {
  transform: translateY(-2px);
}

.calendar-grid__day-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.calendar-grid__day-number {
  font-weight: 700;
  color: #0f172a;
}

.calendar-grid__events {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.calendar-event {
  justify-content: flex-start;
  gap: 6px;
  font-weight: 600;
  font-size: 12px;
  color: #0f172a;
}

.calendar-event__time {
  font-variant-numeric: tabular-nums;
}

.info-card {
  margin-bottom: 24px;
}

.info-card__title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 700;
  color: #0a0a0a;
}

.info-card__subtitle {
  font-size: 13px;
  color: #64748b;
}

.info-card__legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-card__legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: #475569;
}

.legend-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.info-card__list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-card__list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8fafc;
}

.info-card__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.info-card__stat {
  background-color: #f8fafc;
  border-radius: 14px;
  padding: 16px;
  text-align: center;
}

.info-card__stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

.info-card__stat-label {
  font-size: 12px;
  color: #475569;
}

.status--confirmed {
  background-color: rgba(50, 174, 59, 0.16) !important;
  color: #1b5e20 !important;
}

.status--waiting {
  background-color: rgba(255, 209, 102, 0.2) !important;
  color: #C88800 !important;
}

.status--full {
  background-color: rgba(255, 142, 139, 0.2) !important;
  color: #D14343 !important;
}

.legend-dot.status--confirmed {
  background-color: #1b5e20;
}

.legend-dot.status--waiting {
  background-color: #ffc81a;
}

.legend-dot.status--full {
  background-color: #d14343;
}

@media (max-width: 1024px) {
  .calendar-grid {
    gap: 8px;
  }

  .calendar-grid__day {
    min-height: 90px;
    border-radius: 14px;
  }

  .info-card__stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .calendar-page {
    padding: 24px 16px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .page-header__create {
    width: 100%;
  }

  .calendar-card__actions {
    gap: 4px;
  }
}

@media (max-width: 600px) {
  .calendar-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .calendar-grid__weekday {
    display: none;
  }
}
</style>
