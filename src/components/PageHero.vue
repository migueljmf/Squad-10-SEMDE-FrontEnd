<template>
  <section class="page-hero">
    <div class="page-hero__content">
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="description" class="page-hero__description">
        {{ description }}
      </p>
      <slot name="extra" />
    </div>
    <aside
      v-if="highlightLabel || highlightValue || highlightSubtext"
      class="page-hero__highlight"
    >
      <span v-if="highlightLabel" class="page-hero__highlight-label">{{ highlightLabel }}</span>
      <strong v-if="highlightValue" class="page-hero__highlight-value">{{ highlightValue }}</strong>
      <span v-if="highlightSubtext" class="page-hero__highlight-subtext">{{ highlightSubtext }}</span>
    </aside>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  highlightLabel: {
    type: String,
    default: "",
  },
  highlightValue: {
    type: String,
    default: "",
  },
  highlightSubtext: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.page-hero {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 24px;
  padding: 32px 40px;
  border-radius: 28px;
  background: linear-gradient(115deg, #0c56d4 0%, #0d78d9 45%, #1aa0f2 100%);
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.page-hero::after {
  content: "";
  position: absolute;
  width: 320px;
  height: 320px;
  right: -120px;
  top: 50%;
  transform: translateY(-50%);
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
}

.page-hero__content {
  max-width: 60%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.page-hero__title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px;
}

.page-hero__description {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  opacity: 0.92;
}

.page-hero__highlight {
  min-width: 240px;
  padding: 22px 24px;
  border-radius: 20px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0.14));
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  z-index: 1;
  backdrop-filter: blur(12px);
}

.page-hero__highlight-label {
  font-size: 14px;
  font-weight: 600;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.page-hero__highlight-value {
  font-size: 26px;
  font-weight: 700;
}

.page-hero__highlight-subtext {
  font-size: 14px;
  opacity: 0.85;
}

@media (max-width: 1024px) {
  .page-hero {
    flex-direction: column;
    gap: 20px;
  }

  .page-hero__content {
    max-width: 100%;
  }

  .page-hero__highlight {
    align-self: flex-start;
    text-align: left;
  }
}

@media (max-width: 640px) {
  .page-hero {
    padding: 24px;
  }

  .page-hero__title {
    font-size: 26px;
  }

  .page-hero__highlight {
    min-width: 0;
    width: 100%;
  }
}
</style>
