//https://github.com/okonet/lint-staged/issues/825
module.exports = {
  "*.ts": [() => "tsc --skipLibCheck --noEmit", "pnpm prettier --write ."],
};
