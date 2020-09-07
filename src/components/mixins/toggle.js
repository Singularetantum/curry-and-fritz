const toggle = {
  data() {
    return {
      isOpen: !!this.value,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};

export default toggle;
