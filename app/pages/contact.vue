<template>
  <div>
    <!-- Hero -->
    <section class="bg-primary-gradient py-20 md:py-28">
      <div class="container-narrow text-center">
        <h1 class="text-white mb-4">{{ t('contact.heading') }}</h1>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">{{ t('contact.subheading') }}</p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-narrow">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Form -->
          <div>
            <h2 class="text-2xl font-display font-semibold text-primary-900 dark:text-white mb-8">
              {{ t('contact.formTitle') }}
            </h2>
            <form
              class="space-y-6"
              @submit.prevent="handleSubmit"
              novalidate
            >
              <!-- Name -->
              <div>
                <label for="contact-name" class="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
                  {{ t('contact.name') }} <span class="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.name }"
                  :aria-invalid="errors.name ? 'true' : undefined"
                  :placeholder="t('contact.namePlaceholder')"
                  @input="errors.name = ''"
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-500" role="alert">{{ errors.name }}</p>
              </div>

              <!-- Email -->
              <div>
                <label for="contact-email" class="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
                  {{ formatEmail(t('contact.email')) }} <span class="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.email }"
                  :aria-invalid="errors.email ? 'true' : undefined"
                  :placeholder="formatEmail(t('contact.emailPlaceholder'))"
                  @input="errors.email = ''"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-500" role="alert">{{ errors.email }}</p>
              </div>

              <!-- Phone -->
              <div>
                <label for="contact-phone" class="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
                  {{ t('contact.phone') }}
                </label>
                <input
                  id="contact-phone"
                  v-model="form.phone"
                  type="tel"
                  class="form-input"
                  :placeholder="t('contact.phonePlaceholder')"
                />
              </div>

              <!-- Subject -->
              <div>
                <label for="contact-subject" class="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
                  {{ t('contact.subject') }}
                </label>
                <input
                  id="contact-subject"
                  v-model="form.subject"
                  type="text"
                  class="form-input"
                  :placeholder="t('contact.subjectPlaceholder')"
                />
              </div>

              <!-- Message -->
              <div>
                <label for="contact-message" class="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
                  {{ t('contact.message') }} <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  class="form-input min-h-[150px] resize-y"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.message }"
                  :aria-invalid="errors.message ? 'true' : undefined"
                  :placeholder="t('contact.messagePlaceholder')"
                  @input="errors.message = ''"
                />
                <p v-if="errors.message" class="mt-1 text-sm text-red-500" role="alert">{{ errors.message }}</p>
              </div>

              <!-- Success -->
              <div v-if="submitted" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl" role="alert">
                <p class="text-green-700 dark:text-green-400 text-sm">{{ t('contact.success') }}</p>
              </div>

              <ABaseButton type="submit" variant="filled" :loading="loading" full-width>
                {{ loading ? t('contact.submitting') : t('contact.submit') }}
              </ABaseButton>
            </form>
          </div>

          <!-- Info -->
          <div>
            <div class="bg-surface-light dark:bg-gray-800 rounded-2xl p-8 mb-8">
              <h3 class="text-xl font-display font-semibold text-primary-900 dark:text-white mb-6">
                {{ t('contact.infoHeading') }}
              </h3>
              <ul class="space-y-4">
                <li class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AIcon name="location_on" size="md" class="text-accent-500" decorative />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-primary-900 dark:text-white">Address</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('contact.address') }}</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AIcon name="phone" size="md" class="text-accent-500" decorative />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-primary-900 dark:text-white">Phone</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('contact.phoneNumber') }}</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AIcon name="email" size="md" class="text-accent-500" decorative />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-primary-900 dark:text-white">Email</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatEmail(t('contact.emailAddress')) }}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="bg-surface-light dark:bg-gray-800 rounded-2xl p-8">
              <h3 class="text-xl font-display font-semibold text-primary-900 dark:text-white mb-4">
                {{ t('contact.hoursHeading') }}
              </h3>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>{{ t('contact.hoursWeekday') }}</li>
                <li>{{ t('contact.hoursSaturday') }}</li>
                <li>{{ t('contact.hoursSunday') }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  message: '',
})

const loading = ref(false)
const submitted = ref(false)

function validate(): boolean {
  let valid = true
  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = t('contact.validation.nameRequired')
    valid = false
  }
  if (!form.email.trim()) {
    errors.email = formatEmail(t('contact.validation.emailRequired'))
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = formatEmail(t('contact.validation.emailInvalid'))
    valid = false
  }
  if (!form.message.trim()) {
    errors.message = t('contact.validation.messageRequired')
    valid = false
  }

  return valid
}

async function handleSubmit() {
  if (!validate()) return

  loading.value = true
  // Simulate submission
  await new Promise((resolve) => setTimeout(resolve, 1500))
  loading.value = false
  submitted.value = true

  // Reset form
  form.name = ''
  form.email = ''
  form.phone = ''
  form.subject = ''
  form.message = ''
}
</script>
