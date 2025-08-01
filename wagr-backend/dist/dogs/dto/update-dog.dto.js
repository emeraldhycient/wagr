"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_dog_dto_1 = require("./create-dog.dto");
class UpdateDogDto extends (0, swagger_1.PartialType)(create_dog_dto_1.CreateDogDto) {
}
exports.UpdateDogDto = UpdateDogDto;
//# sourceMappingURL=update-dog.dto.js.map