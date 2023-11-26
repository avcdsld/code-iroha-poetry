class InteractiveArt {
  constructor() {
    this.totalVisitors = 0;
  }

  visit(numberOfVisitors) {
    this.totalVisitors += numberOfVisitors;
  }
}

const art = new InteractiveArt();
art.visit(1);
