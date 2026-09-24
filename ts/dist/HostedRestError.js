"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostedRestError = void 0;
class HostedRestError extends Error {
    isHostedRestError = true;
    sdk = 'HostedRest';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.HostedRestError = HostedRestError;
//# sourceMappingURL=HostedRestError.js.map