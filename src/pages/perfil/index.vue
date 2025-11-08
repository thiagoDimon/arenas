<template>
  <v-container class="pa-6">
    <arn-alerta
      v-model="alert.show"
      :color="alert.color"
      :text="alert.text"
      :title="alert.title"
      :type="alert.type"
    />
    <v-progress-linear v-if="loading" class="mb-4" color="primary" indeterminate />
    <v-card class="mb-4 pa-6 rounded-lg" elevation="2">
      <v-row align="center">
        <v-col cols="auto">
          <v-badge
            bordered
            bottom
            color="primary"
            icon="mdi-camera"
            offset-x="10"
            offset-y="10"
            overlap
          >
            <v-avatar color="amber" size="80">
              <v-img v-if="profileImageUrl" cover :src="profileImageUrl" />
              <span v-else class="text-h5">{{ initials }}</span>
            </v-avatar>
          </v-badge>
        </v-col>
        <v-col>
          <h2 class="text-h5">{{ fullName }}</h2>
          <input
            ref="fileInput"
            accept="image/*"
            hidden
            type="file"
            @change="handleFileChange"
          >
          <v-btn
            class="pa-0"
            color="primary"
            size="small"
            style="text-transform: none;"
            variant="text"
            @click="triggerFileInput"
          >
            {{ $t('editarImagemPerfil') }}
          </v-btn>
          <v-btn
            v-if="profileImageUrl || selectedFile"
            class="pa-0 ml-2"
            color="error"
            size="small"
            style="text-transform: none;"
            variant="text"
            @click="removeProfileImage"
          >
            {{ $t('removerImagem') }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="selectedFile && !uploadingImage" class="mt-2">
        <v-col cols="12">
          <v-alert
            class="mb-0"
            color="info"
            density="compact"
            type="info"
          >
            {{ $t('imagemSelecionada') }}: {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-if="uploadingImage" class="mt-2">
        <v-col cols="12">
          <v-progress-linear
            color="primary"
            indeterminate
          />
          <p class="text-caption text-center mt-2">{{ $t('enviandoImagem') }}...</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mb-4 pa-6 rounded-lg" elevation="2">
      <div class="d-flex align-center mb-4">
        <v-icon class="mr-2">mdi-account-circle</v-icon>
        <div>
          <h3 class="text-h6">{{ $t('informacoesBasicas') }}</h3>
          <p class="text-caption text-medium-emphasis ma-0">{{ $t('definaDetalhesPerfilConta') }}</p>
        </div>
      </div>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="firstName"
            color="primary"
            density="comfortable"
            :disabled="loading"
            :error-messages="firstNameErrors"
            :label="$t('nome')"
            required
            variant="outlined"
            @blur="validateFirstName"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="lastName"
            color="primary"
            density="comfortable"
            :disabled="loading"
            :error-messages="lastNameErrors"
            :label="$t('sobrenome')"
            required
            variant="outlined"
            @blur="validateLastName"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="phone"
            color="primary"
            density="comfortable"
            :disabled="loading"
            :error-messages="phoneErrors"
            hint="Digite apenas números (10 ou 11 dígitos)"
            :label="$t('telefone')"
            maxlength="15"
            required
            type="tel"
            variant="outlined"
            @blur="validatePhone"
            @input="formatPhone"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="birthDate"
            color="primary"
            density="comfortable"
            :disabled="loading"
            :error-messages="birthDateErrors"
            :label="$t('dataNascimento')"
            :max="maxDate"
            required
            type="date"
            variant="outlined"
            @blur="validateBirthDate"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="description"
            color="primary"
            counter="5000"
            density="comfortable"
            :disabled="loading"
            :label="$t('descricao')"
            rows="3"
            :rules="[v => !v || v.length <= 5000 || $t('descricaoMaximoCaracteres')]"
            variant="outlined"
          />
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mb-4 pa-6 rounded-lg" elevation="2">
      <div class="d-flex align-center mb-4">
        <v-icon class="mr-2">mdi-translate</v-icon>
        <div>
          <h3 class="text-h6">{{ $t('idioma') }}</h3>
          <p class="text-caption text-medium-emphasis ma-0">{{ $t('selecioneIdiomaPreferencia') }}</p>
        </div>
      </div>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedLanguage"
            color="primary"
            density="comfortable"
            :items="languages"
            :label="$t('idiomaInterface')"
            variant="outlined"
          />
        </v-col>
      </v-row>
    </v-card>
    <v-row class="mt-4" justify="end">
      <v-col cols="auto">
        <arn-button bg-color="#B00020" :disabled="loading || saving" :flat="true" @click="handleCancel()">
          <span>{{ $t('cancelar') }}</span>
        </arn-button>
      </v-col>
      <v-col cols="auto">
        <arn-button bg-color="#32AE3B" :disabled="loading" :flat="true" @click="handleSave()">
          <span>{{ $t('salvarAlteracoes') }}</span>
        </arn-button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import ArnAlerta from '@/components/ArnAlerta.vue'
  import axios from '@/services/axios'
  import { changeLanguage } from '@/util/functions'

  const { locale, t } = useI18n()

  const loading = ref(false)
  const saving = ref(false)
  const uploadingImage = ref(false)
  const userId = ref(null)
  const fileInput = ref(null)
  const firstNameErrors = ref([])
  const lastNameErrors = ref([])
  const phoneErrors = ref([])
  const birthDateErrors = ref([])

  const alert = ref({
    show: false,
    title: '',
    text: '',
    type: 'success',
    color: 'success',
  })

  const firstName = ref('')
  const lastName = ref('')
  const description = ref('')
  const email = ref('')
  const phone = ref('')
  const birthDate = ref(null)
  const rolePlayer = ref(null)
  const profileImageUrl = ref(null)
  const selectedFile = ref(null)

  const originalData = ref({})
  const originalProfileImageUrl = ref(null)

  const selectedLanguage = ref('pt')
  const originalLanguage = ref('pt')
  const languages = ref([
    { title: 'Português', value: 'pt' },
    { title: 'English', value: 'en' },
    { title: 'Español', value: 'es' },
  ])

  const fullName = computed(() => {
    const first = firstName.value || ''
    const last = lastName.value || ''
    return `${first} ${last}`.trim() || 'Usuário'
  })

  const initials = computed(() => {
    const first = (firstName.value || 'U').charAt(0).toUpperCase()
    const last = (lastName.value || 'S').charAt(0).toUpperCase()
    return `${first}${last}`
  })

  const maxDate = computed(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })

  const showAlert = (title, text, type = 'success') => {
    alert.value = {
      show: true,
      title,
      text,
      type,
      color: type,
    }
  }

  const triggerFileInput = () => {
    fileInput.value.click()
  }

  const formatFileSize = size => {
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
    return `${(size / (1024 * 1024)).toFixed(2)} MB`
  }

  const handleFileChange = async event => {
    const file = event.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      showAlert(
        t('erro'),
        t('arquivoDeveSerImagem'),
        'error',
      )
      return
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      showAlert(
        t('erro'),
        t('imagemMuitoGrande'),
        'error',
      )
      return
    }

    selectedFile.value = file

    const reader = new FileReader()
    reader.addEventListener('load', e => {
      profileImageUrl.value = e.target.result
    })
    reader.readAsDataURL(file)
  }

  const removeProfileImage = () => {
    profileImageUrl.value = null
    selectedFile.value = null

    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }

  const formatPhone = () => {
    let cleaned = phone.value.replaceAll(/\D/g, '')

    if (cleaned.length > 11) {
      cleaned = cleaned.slice(0, 11)
    }

    phone.value = cleaned.length <= 10
      ? cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, (match, p1, p2, p3) => {
        let result = `(${p1}) ${p2}`
        if (p3) result += `-${p3}`
        return result
      })
      : cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, (match, p1, p2, p3) => {
        let result = `(${p1}) ${p2}`
        if (p3) result += `-${p3}`
        return result
      })
  }

  const getCleanPhone = () => {
    return phone.value.replace(/\D/g, '')
  }

  const applyPhoneFormat = phoneNumber => {
    if (!phoneNumber) return ''

    const cleaned = phoneNumber.replace(/\D/g, '')

    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, (match, p1, p2, p3) => {
        let result = `(${p1}) ${p2}`
        if (p3) result += `-${p3}`
        return result
      })
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, (match, p1, p2, p3) => {
      let result = `(${p1}) ${p2}`
      if (p3) result += `-${p3}`
      return result
    })
  }

  // Validações
  const validateFirstName = () => {
    firstNameErrors.value = []
    if (!firstName.value || firstName.value.trim() === '') {
      firstNameErrors.value.push(t('nomeObrigatorio'))
    } else if (firstName.value.length > 100) {
      firstNameErrors.value.push(t('nomeMaximoCaracteres'))
    }
    return firstNameErrors.value.length === 0
  }

  const validateLastName = () => {
    lastNameErrors.value = []
    if (!lastName.value || lastName.value.trim() === '') {
      lastNameErrors.value.push(t('sobrenomeObrigatorio'))
    } else if (lastName.value.length > 100) {
      lastNameErrors.value.push(t('sobrenomeMaximoCaracteres'))
    }
    return lastNameErrors.value.length === 0
  }

  const validatePhone = () => {
    phoneErrors.value = []
    const phoneDigits = phone.value ? phone.value.replace(/\D/g, '') : ''

    if (!phone.value || phone.value.trim() === '') {
      phoneErrors.value.push(t('telefoneObrigatorio'))
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      phoneErrors.value.push(t('telefoneInvalido'))
    } else if (!/^\d{10,11}$/.test(phoneDigits)) {
      phoneErrors.value.push(t('telefoneInvalido'))
    }
    return phoneErrors.value.length === 0
  }

  const validateBirthDate = () => {
    birthDateErrors.value = []
    if (birthDate.value) {
      const selectedDate = new Date(birthDate.value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate >= today) {
        birthDateErrors.value.push(t('dataNascimentoPassado'))
      }
    } else {
      birthDateErrors.value.push(t('dataNascimentoObrigatoria'))
    }
    return birthDateErrors.value.length === 0
  }

  const validateDescription = () => {
    return description.value && description.value.length > 5000
  }

  const validateForm = () => {
    const isFirstNameValid = validateFirstName()
    const isLastNameValid = validateLastName()
    const isPhoneValid = validatePhone()
    const isBirthDateValid = validateBirthDate()
    const isDescriptionValid = validateDescription()

    if (!isDescriptionValid) {
      showAlert(
        t('atencao'),
        t('descricaoMaximoCaracteres'),
        'warning',
      )
    }

    return isFirstNameValid && isLastNameValid && isPhoneValid && isBirthDateValid && isDescriptionValid
  }

  const loadUserData = async () => {
    loading.value = true
    try {
      const response = await axios.get('/user/me')
      const userData = response.data

      userId.value = userData.id
      email.value = userData.email || ''

      const userDetailResponse = await axios.get(`/user/${userData.id}`)
      const userDetail = userDetailResponse.data

      firstName.value = userDetail.firstName || ''
      lastName.value = userDetail.lastName || ''
      description.value = userDetail.profileDescription || ''
      phone.value = applyPhoneFormat(userDetail.phone || '')
      birthDate.value = userDetail.birthDate || null
      rolePlayer.value = userDetail.rolePlayer || null

      if (userDetail.profilePic) {
        if (typeof userDetail.profilePic === 'string') {
          profileImageUrl.value = userDetail.profilePic.startsWith('data:')
            ? userDetail.profilePic
            : `data:image/jpeg;base64,${userDetail.profilePic}`
        } else if (userDetail.profilePic instanceof ArrayBuffer || Array.isArray(userDetail.profilePic)) {
          const base64 = btoa(
            new Uint8Array(userDetail.profilePic)
              .reduce((data, byte) => data + String.fromCodePoint(byte), ''),
          )
          profileImageUrl.value = `data:image/jpeg;base64,${base64}`
        }
      } else {
        profileImageUrl.value = null
      }

      originalProfileImageUrl.value = profileImageUrl.value

      originalData.value = {
        firstName: firstName.value,
        lastName: lastName.value,
        description: description.value,
        phone: phone.value,
        birthDate: birthDate.value,
        rolePlayer: rolePlayer.value,
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error)
      showAlert(
        t('erro'),
        t('erroCarregarPerfil'),
        'error',
      )
    } finally {
      loading.value = false
    }
  }

  const handleSave = async () => {
    if (!userId.value) return

    if (!validateForm()) {
      showAlert(
        t('atencao'),
        t('preenchaCamposObrigatorios'),
        'warning',
      )
      return
    }

    saving.value = true
    try {
      const cleanPhone = getCleanPhone()

      const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        profileDescription: description.value || '',
        phone: cleanPhone,
        birthDate: birthDate.value,
        rolePlayer: rolePlayer.value,
      }

      if (selectedFile.value) {
        userData.profilePic = profileImageUrl.value
      } else if (!profileImageUrl.value && originalProfileImageUrl.value) {
        userData.profilePic = ''
      }

      await axios.put(`/user/${userId.value}`, userData)

      if (selectedFile.value) {
        selectedFile.value = null
        if (fileInput.value) {
          fileInput.value.value = ''
        }
      }

      originalData.value = {
        firstName: firstName.value,
        lastName: lastName.value,
        description: description.value,
        phone: phone.value,
        birthDate: birthDate.value,
        rolePlayer: rolePlayer.value,
      }

      originalProfileImageUrl.value = profileImageUrl.value
      selectedFile.value = null

      if (selectedLanguage.value !== originalLanguage.value) {
        changeLanguage(selectedLanguage.value)
        originalLanguage.value = selectedLanguage.value
      }

      showAlert(
        t('sucesso'),
        t('perfilAtualizadoSucesso'),
        'success',
      )
    } catch (error) {
      console.error('Erro ao salvar perfil:', error)
      showAlert(
        t('erro'),
        t('erroSalvarPerfil'),
        'error',
      )
    } finally {
      saving.value = false
    }
  }

  const handleCancel = () => {
    firstName.value = originalData.value.firstName
    lastName.value = originalData.value.lastName
    description.value = originalData.value.description
    phone.value = originalData.value.phone
    birthDate.value = originalData.value.birthDate
    rolePlayer.value = originalData.value.rolePlayer

    profileImageUrl.value = originalProfileImageUrl.value
    selectedFile.value = null

    if (fileInput.value) {
      fileInput.value.value = ''
    }

    selectedLanguage.value = originalLanguage.value

    firstNameErrors.value = []
    lastNameErrors.value = []
    phoneErrors.value = []
    birthDateErrors.value = []
  }

  onMounted(async () => {
    const savedLanguage = localStorage.getItem('language') || 'pt'
    selectedLanguage.value = savedLanguage
    originalLanguage.value = savedLanguage
    locale.value = savedLanguage

    await loadUserData()
  })
</script>
