import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // 获取控制器、处理程序、参数、属性等的元数据
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(), // 返回正在处理当前请求的处理器函数
      context.getClass(), // 返回正在处理当前请求的控制器类 右到左的优先级，它优先
    ]);

    if (isPublic) return true;

    return super.canActivate(context); // 身份验证逻辑，如若有@Public则早已提前return，这里不会执行
  }
}
